import React, { Component } from "react";
import axios from "axios";
import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blog_status: "",
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.handleRichTextChange = this.handleRichTextChange.bind(this);
  }

  handleRichTextChange(content) {
    this.setState({
      content: content
    })
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);
    formData.append("portfolio_blog[content]", this.state.content);


    return formData;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFormSubmit(event) {
    axios
      .post(
        "https://sahakplt.devcamp.space/portfolio/portfolio_blogs",
        this.buildForm(),
        { withCredentials: true }
      )
      .then(res => {
        this.setState({
          title: "",
          blog_status: "",
          content: ""
        });

        this.props.handleFormSubmit(res.data.portfolio_blog);
        })
      .catch(err => {
        console.log(err);
      });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className="blog-form-wrapper">
        <div className="two-columns">
          <input
            type="text"
            onChange={this.handleChange}
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
          />
          <input
            type="text"
            onChange={this.handleChange}
            name="blog_status"
            placeholder="Blog Status"
            value={this.state.blog_status}
          />
        </div>
        <div className="one-column">
        <RichTextEditor handleRichTextChange={this.handleRichTextChange}/>
        </div>

        <button className="blog-form-button">Save</button>
      </form>
    );
  }
}
