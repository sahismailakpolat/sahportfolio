import React, { Component } from "react";
import ReactModal from "react-modal";
import BlogForm from "../blog/blog-form";

ReactModal.setAppElement(".app-wrapper");

export default class BlogModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "-50%",
        transform: "translate(-50%, -50%)",
        width: "750px",
        borderRadius: "30px"
      },
      overlay: {
          backgroundColor: "rgba(1, 1, 1, 0.75)"
      }
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(blog) {
    this.props.handleNewBlogSubmit(blog)
  }

  render() {
    return (
      <ReactModal
      style={this.customStyles}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalOpen}
      >
        <BlogForm handleFormSubmit={this.handleFormSubmit} />
      </ReactModal>
    );
  }
}
