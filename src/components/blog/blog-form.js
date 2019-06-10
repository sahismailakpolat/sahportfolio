import React, { Component } from "react";
import axios from "axios";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      blog_status: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);

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
        this.props.handleFormSubmit(res.data.portfolio_blog);

        this.setState({
            title: "",
            blog_status: ""
        })
      }).catch(err => {
          console.log(err);
      })

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
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

        <button>Save</button>
      </form>
    );
  }
}
