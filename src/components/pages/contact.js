import React from "react";
import Contact from "../../../static/assets/images/auth/contact.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function() {
  return (
    <div className="contact-wrapper">
      <div className="contact-content">
        <div className="contact-bullet-points">
          <div className="contact-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="phone" />
            </div>
            <div className="text">555-555-5555</div>
          </div>

          <div className="contact-point-group">
          <div className="icon">
            <FontAwesomeIcon icon="envelope" />
          </div>
          <div className="text">akpolat.sahismail@gmail.com</div>
        </div>

        <div className="contact-point-group">
        <div className="icon">
          <FontAwesomeIcon icon="map-marker-alt" />
        </div>
        <div className="text">Houston, TX</div>
      </div>
        </div>
      </div>

      <div
        className="contact-img"
        style={{
          backgroundImage: `url(${Contact})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 15
        }}
      />
    </div>
  );
}
