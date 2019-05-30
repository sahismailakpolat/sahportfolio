import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      data: []
    };
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter(el => {
        return el.name === filter;
      })
    });
  }

  getPortfolioItems() {
    axios
      .get("https://sahakplt.devcamp.space/portfolio/portfolio_items")
      .then(res => {
        this.setState({
          data: res.data.portfolio_items
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  portfolioItems() {
    return this.state.data.map(el => {
      return <PortfolioItem key={el.id} el={el} />;
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading....</div>;
    }

    return (
      <div className="portfolio-items-wrapper">
        <button className="btn">
          eCommerce
        </button>
        <button className="btn">
          Scheduling
        </button>
        <button className="btn">
          Enterprise
        </button>

        {this.portfolioItems()}
      </div>
    );
  }
}
