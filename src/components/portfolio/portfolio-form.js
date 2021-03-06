import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      category: "eCommerce",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: "",
      editMode: false,
      apiUrl: "https://sahakplt.devcamp.space/portfolio/portfolio_items",
      apiAction: "post"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleThumbDropzone = this.handleThumbDropzone.bind(this);
    this.deleteImg = this.deleteImg.bind(this);

    this.thumbRef = React.createRef();
    this.bannerRef = React.createRef();
    this.logoRef = React.createRef();
  }

  componentDidUpdate() {
    if (Object.keys(this.props.portfolioToEdit).length > 0) {
      const {
        id,
        name,
        description,
        category,
        position,
        url,
        thumb_image_url,
        banner_image_url,
        logo_url
      } = this.props.portfolioToEdit;

      this.props.clearPortfolioEdit();

      this.setState({
        id: id,
        name: name || "",
        description: description || "",
        category: category || "eCommerce",
        position: position || "",
        url: url || "",
        editMode: true,
        apiUrl: `https://sahakplt.devcamp.space/portfolio/portfolio_items/${id}`,
        apiAction: "patch",
        thumb_image_url: thumb_image_url || "",
        banner_image_url: banner_image_url || "",
        logo_url: logo_url || ""
      });
    }
  }

  handleThumbDropzone() {
    return {
      addedfile: file => this.setState({ thumb_image: file })
    };
  }

  handleBannerDrop() {
    return {
      addedfile: file => this.setState({ banner_image: file })
    };
  }

  handleLogoDrop() {
    return {
      addedfile: file => this.setState({ logo: file })
    };
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);
    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }

    return formData;
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

  handleSubmit(event) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      withCredentials: true
    })
      .then(res => {
        if (this.state.editMode) {
          this.props.handleFormEdit();
        } else {
          this.props.handleFormSubmit(res.data.portfolio_item);
        }

        this.setState({
          name: "",
          description: "",
          category: "eCommerce",
          position: "",
          url: "",
          thumb_image: "",
          banner_image: "",
          logo: "",
          editMode: false,
          apiUrl: "https://sahakplt.devcamp.space/portfolio/portfolio_items",
          apiAction: "post"
        });
        [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
          ref.current.dropzone.removeAllFiles();
        });
      })
      .catch(err => {
        this.props.handleFormSubmitFailures(err);
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  deleteImg(imageType) {
    axios.delete(
      `https://api.devcamp.space/portfolio/delete-portfolio-image/${
        this.state.id
      }?image_type=${imageType}`,
      { withCredentials: true }
    ).then(res => {
      this.setState({
        [`${imageType}_url`]: ""
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="name"
            placeholder="Portfolio Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="url"
            placeholder="URL"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </div>

        <div className="two-column">
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={this.state.position}
            onChange={this.handleChange}
          />
          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="eCommerce">eCommerce</option>
            <option value="Scheduling">Scheduling</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
        <div className="one-column">
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div className="img-uploaders">
          {this.state.thumb_image_url && this.state.editMode ? (
            <div className="portfolio-manager-img-wrapper">
              <img src={this.state.thumb_image_url} />
              <div className="img-removal-link">
                <a onClick={() => this.deleteImg("thumb_img")}>Remove Image</a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.thumbRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleThumbDropzone()}
            >
              <div className="dz-message">Thumbnail</div>
            </DropzoneComponent>
          )}

          {this.state.banner_image_url && this.state.editMode ? (
            <div className="portfolio-manager-img-wrapper">
              <img src={this.state.banner_image_url} />
              <div className="img-removal-link">
                <a onClick={() => this.deleteImg("banner_image")}>
                  Remove Image
                </a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.bannerRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleBannerDrop()}
            >
              <div className="dz-message">Banner</div>
            </DropzoneComponent>
          )}

          {this.state.logo_url && this.state.editMode ? (
            <div className="portfolio-manager-img-wrapper">
              <img src={this.state.logo_url} />
              <div className="img-removal-link">
                <a onClick={() => this.deleteImg("logo")}>Remove Image</a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.logoRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleLogoDrop()}
            >
              <div className="dz-message">Logo</div>
            </DropzoneComponent>
          )}
        </div>

        <div>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}
