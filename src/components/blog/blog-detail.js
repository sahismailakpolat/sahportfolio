import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import BlogFeaturedImage from "./blog-featured-img";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {}
    };

    this.getBlogItem = this.getBlogItem.bind(this);
  }
  
  getBlogItem() {
    axios
      .get(
        `https://sahakplt.devcamp.space/portfolio/portfolio_blogs/${
          this.state.currentId
        }`
      )
      .then(res => {
        this.setState({
          blogItem: res.data.portfolio_blog
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    this.getBlogItem();
  }

  render() {
    const {
      title,
      content,
      featured_image_url,
      blog_status
    } = this.state.blogItem;
    return (
      <div className="blog-wrapper">
        <div className="content-wrapper">
          <div className="blog-title">{title}</div>

          <BlogFeaturedImage img={featured_image_url} />

          <div className="blog-content">{ReactHtmlParser(content)}</div>
        </div>
      </div>
    );
  }
}
