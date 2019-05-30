import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";

const NavigationContainer = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignout = () => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          props.history.push("/");
          props.handleLogout();
        }
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="navigation-wrapper">
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink to="/about" activeClassName="nav-link-active">
            About
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
        <NavLink to="/blog" activeClassName="nav-link-active">
          Blog
        </NavLink>
      </div>

        <div className="nav-link-wrapper">
          <NavLink to="/contact" activeClassName="nav-link-active">
            Contact
          </NavLink>
        </div>

        {props.loggedIn === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager") : null}
      </div>

      <div className="right-side">
        Sahismail Akpolat
        {props.loggedIn === "LOGGED_IN" ? (
          <a onClick={handleSignout}> Sign Out</a>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(NavigationContainer);
