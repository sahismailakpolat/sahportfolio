import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Blog from "./pages/blog";
import BlogDetail from "./blog/blog-detail";
import Contact from "./pages/contact";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from "./pages/portfolio-manager";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedIn: "NOT_LOGGED_IN"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedIn: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedIn: "NOT_LOGGED_IN"
    });
  }

  handleLogout() {
    this.setState({
      loggedIn: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", {
        withCredentials: true
      })
      .then(res => {
        const logIn = res.data.logged_in;
        const logInStatus = this.state.loggedIn;

        if (logIn && logInStatus === "LOGGED_IN") {
          return logIn;
        } else if (logIn && logInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedIn: "LOGGED_IN"
          });
        } else if (!logIn && logInStatus === "LOGGED_IN") {
          this.setState({
            loggedIn: "NOT_LOGGED_IN"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    this.checkLoginStatus();
  }

  authPages() {
    return [<Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />];
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer
              loggedIn={this.state.loggedIn}
              handleLogout={this.handleLogout}
            />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              
              <Route 
              path="/blog"
              render={props => (
                <Blog {...props} loggedIn={this.state.loggedIn} />
              )}  
              />

              <Route path="/b/:slug" component={BlogDetail} />
              <Route path="/contact" component={Contact} />
              {this.state.loggedIn === "LOGGED_IN" ? this.authPages() : null}

              <Route
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />

              <Route
                exact
                path="/portfolio/:slug"
                component={PortfolioDetail}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

