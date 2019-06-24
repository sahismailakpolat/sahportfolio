import React, { Component } from "react";
import axios from "axios";

class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state ={
      portfolioItem: ""
    }
  }

  componentWillMount() {
    this.getPortfolioItem();
  }

  getPortfolioItem() {
    axios
      .get(
        `https://sahakplt.devcamp.space/portfolio/portfolio_items/${
          this.props.match.params.slug
        }`,
        { withCredentials: true }
      )
      .then(res => {
        this.setState({
          portfolioItem: res.data.portfolio_item
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      banner_image_url,
      category,
      logo_url,
      name,
      description,
      thumb_image_url,
      url
    } = this.state.portfolioItem


    const bannerImgStyles = {
      backgroundImage: "url(" + banner_image_url + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center"
    }

    const logoStyles = {
      width: "150px"
    }

    return (
    <div className="portfolio-detail-wrapper">
      <div className="banner-img" style={bannerImgStyles}>
        <img src={logo_url} style={logoStyles} />
      </div>

      <div className="portfolio-detail-description">
        <div className="description">{description}</div>
      </div>
 
      <div className="bottom-content">
        <a href={url} className="side-link" target="_blank">
        Visit {name}
        </a>
      </div>
    </div>
    );
  }
}

export default PortfolioDetail;
