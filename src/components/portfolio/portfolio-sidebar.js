import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebar = props => {
  const portfolioList = props.data.map(el => {
    return (
      <div key={el.id} className="portfolio-item-thumb">
        <div className="portfolio-item-thumb-img">
          <img src={el.thumb_image_url} />
        </div>

        <div className="text-content">
          <div className="title">{el.name}</div>

          <div className="actions">
            <a className="action-icon" onClick={() => props.handleEditClick(el)}>
              <FontAwesomeIcon icon="edit" />
            </a>
            <a
              className="action-icon"
              onClick={() => props.handleDeleteClick(el)}
            >
              <FontAwesomeIcon icon="trash" />
            </a>
          </div>
        </div>
      </div>
    );
  });

  return <div className="portfolio-sidebar-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebar;
