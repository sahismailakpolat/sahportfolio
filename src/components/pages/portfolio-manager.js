import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebar from "../portfolio/portfolio-sidebar";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: [],
      portfolioToEdit: {}
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormEdit = this.handleFormEdit.bind(this);
    this.handleFormSubmitFailures = this.handleFormSubmitFailures.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioEdit = this.clearPortfolioEdit.bind(this);
  }

  handleFormSubmit(portfolioItem) {
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
    });
  }

  handleFormEdit() {
    this.getPortfolioItems();
  }

  handleFormSubmitFailures(err) {
    console.log(err);
  }

  handleDeleteClick(portfolioItem) {
    axios
      .delete(
        `https://sahakplt.devcamp.space/portfolio/portfolio_items/${
          portfolioItem.id
        }`,
        { withCredentials: true }
      )
      .then(res => {
        this.setState({
          portfolioItems: this.state.portfolioItems.filter(item => {
            return item.id !== portfolioItem.id;
          })
        });
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }


  handleEditClick(portfolioItem) {
    this.setState({
      portfolioToEdit: portfolioItem
    });
  }

  clearPortfolioEdit() {
    this.setState({
      portfolioToEdit: {}
    })
  }

  getPortfolioItems() {
    axios
      .get(
        "https://sahakplt.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
        {
          withCredentials: true
        }
      )
      .then(res => {
        this.setState({
          portfolioItems: [...res.data.portfolio_items]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    this.getPortfolioItems();
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-side">
          <PortfolioForm
            handleFormSubmit={this.handleFormSubmit}
            handleFormEdit={this.handleFormEdit}
            handleFormSubmitFailures={this.handleFormSubmitFailures}
            clearPortfolioEdit={this.clearPortfolioEdit}
            portfolioToEdit={this.state.portfolioToEdit}
          />
        </div>

        <div className="right-side">
          <PortfolioSidebar
            data={this.state.portfolioItems}
            handleDeleteClick={this.handleDeleteClick}
            handleEditClick={this.handleEditClick}
          />
        </div>
      </div>
    );
  }
}
