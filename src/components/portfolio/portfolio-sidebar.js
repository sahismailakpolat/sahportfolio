import React from "react";

const PortfolioSidebar = props => {
  const portfolioList = props.data.map(el => {
    return (
      <div key={el.id} className="portfolio-item-thumb">
        <div className="portfolio-item-thumb-img">
          <img src={el.thumb_image_url} />
        </div>
        <h1 className="title">{el.name}</h1>
      </div>
    );
  });

  return <div className="portfolio-sidebar-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebar;
