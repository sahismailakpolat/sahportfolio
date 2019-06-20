import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import BlogFeaturedImage from "./blog-featured-img";
import BlogForm from "./blog-form";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false
    };

    this.getBlogItem = this.getBlogItem.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick() {
    console.log("handled edit click");
    this.setState({
      editMode: true
    });
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

    const contentManager = () => {
      if (this.state.editMode) {
        return <BlogForm editMode={this.state.editMode} blog={this.state.blogItem} />;
      } else {
        return (
        <div className="content-wrapper">
          <div className="blog-title" onClick={this.handleEditClick}>
            {title}
          </div>

          <BlogFeaturedImage img={featured_image_url} />

          <div className="blog-content">{ReactHtmlParser(content)}</div>
        </div>
        )
      }
    };

    return (
    <div className="blog-wrapper">
    {contentManager()}
    </div>
    )
  }
}
