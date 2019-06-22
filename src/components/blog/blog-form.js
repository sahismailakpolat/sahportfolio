import React, { Component } from "react";
import axios from "axios";
import RichTextEditor from "../forms/rich-text-editor";
import DropZoneComponent from "react-dropzone-component";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      title: "",
      blog_status: "",
      content: "",
      featured_image: "",
      apiUrl: "https://sahakplt.devcamp.space/portfolio/portfolio_blogs",
      apiAction: "post"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.handleRichTextChange = this.handleRichTextChange.bind(this);

    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleDropzoneImageDrop = this.handleDropzoneImageDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.featuredImageRef = React.createRef();
  }

  deleteImage(imageType) {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${
          this.props.blog.id
        }?image_type=${imageType}`,
        { withCredentials: true }
      )
      .then(res => {
        this.props.handleImageDelete();
      })
      .catch("deleted image err", err => {
        console.log(err);
      });
  }

  componentWillMount() {
    if (this.props.editMode) {
      this.setState({
        id: this.props.blog.id,
        title: this.props.blog.title,
        blog_status: this.props.blog.blog_status,
        content: this.props.blog.content,
        apiUrl: `https://sahakplt.devcamp.space/portfolio/portfolio_blogs/${
          this.props.blog.id
        }`,
        apiAction: "patch"
      });
    }
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }

  handleDropzoneImageDrop() {
    return {
      addedfile: file =>
        this.setState({
          featured_image: file
        })
    };
  }

  handleRichTextChange(content) {
    this.setState({
      content: content
    });
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);
    formData.append("portfolio_blog[content]", this.state.content);

    if (this.state.featured_image) {
      formData.append(
        "portfolio_blog[featured_image]",
        this.state.featured_image
      );
    }

    return formData;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFormSubmit(event) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      withCredentials: true
    })
      .then(res => {
        if (this.state.featured_image) {
          this.featuredImageRef.current.dropzone.removeAllFiles();
        }

        this.setState({
          title: "",
          blog_status: "",
          content: "",
          featured_image: ""
        });
        if (this.props.editMode) {
          this.props.handleUpdateFormSubmit(res.data.portfolio_blog);
        } else {
          this.props.handleFormSubmit(res.data.portfolio_blog);
        }
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
          <RichTextEditor
            handleRichTextChange={this.handleRichTextChange}
            editMode={this.props.editMode}
            contentToEdit={
              this.props.editMode && this.props.blog.content
                ? this.props.blog.content
                : null
            }
          />
        </div>

        <div className="image-uploaders">
          {this.props.editMode && this.props.blog.featured_image_url ? (
            <div className="portfolio-manager-img-wrapper">
              <img src={this.props.blog.featured_image_url} />
              <div className="img-removal-link">
                <a onClick={() => this.deleteImage()}>Remove Image</a>
              </div>
            </div>
          ) : (
            <DropZoneComponent
              ref={this.featuredImageRef}
              config={this.componentConfig("response from delete image")}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleDropzoneImageDrop()}
            >
              <div className="dz-message">Featured Image</div>
            </DropZoneComponent>
          )}
        </div>

        <button className="blog-form-button">Save</button>
      </form>
    );
  }
}
