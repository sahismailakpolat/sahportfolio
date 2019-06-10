import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import BlogModal from "../modals/blog-modal";

export default class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      blogModalOpen: false
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleNewBlogSubmit = this.handleNewBlogSubmit.bind(this);

  }

  handleNewBlogSubmit(blog) {
    this.setState({
      blogModalOpen: false,
      blogItems: [blog].concat(this.state.blogItems)
    })
  }

  handleNewBlogClick() {
    this.setState({
      blogModalOpen: true
    })
  }

  handleModalClose() {
    this.setState({
      blogModalOpen: false
    })
  }

  onScroll() {
    if (
      this.state.isLoading ||
      this.state.blogItems.length === this.state.totalCount
    ) {
      return;
    }

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.getBlogItems();
    }
  }

  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage + 1
    });

    axios
      .get(
        `https://sahakplt.devcamp.space/portfolio/portfolio_blogs?page=${
          this.state.currentPage
        }`,
        {
          withCredentials: true
        }
      )
      .then(res => {
        this.setState({
          blogItems: this.state.blogItems.concat(res.data.portfolio_blogs),
          totalCount: res.data.meta.total_records,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    this.getBlogItems();
  }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });
    return (
      <div className="blog-wrapper">
        <BlogModal 
          modalOpen={this.state.blogModalOpen}
          handleModalClose={this.handleModalClose}
          handleNewBlogSubmit={this.handleNewBlogSubmit}
          />
        
        <div className="new-blog-link">
          <a onClick={this.handleNewBlogClick}>Open Modal</a>
        </div>

        <div className="content-wrapper">{blogRecords}</div>

        {this.state.isLoading ? (
          <div className="loader-wrapper">
            <FontAwesomeIcon icon="spinner" spin />
          </div>
        ) : null}
      </div>
    );
  }
}
