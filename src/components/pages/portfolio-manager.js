import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebar from "../portfolio/portfolio-sidebar";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormSubmitFailures = this.handleFormSubmitFailures.bind(this);
  }

  handleFormSubmit(portfolioItem) {
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
    });
  }

  handleFormSubmitFailures(err) {
    console.log(err);
  }

  getPortfolioItems() {
    axios
      .get("https://sahakplt.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", {
        withCredentials: true
      })
      .then(res => {
        this.setState({
          portfolioItems: [...res.data.portfolio_items]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-side">
          <PortfolioForm
            handleFormSubmit={this.handleFormSubmit}
            handleFormSubmitFailures={this.handleFormSubmitFailures}
          />
        </div>

        <div className="right-side">
          <PortfolioSidebar data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}
