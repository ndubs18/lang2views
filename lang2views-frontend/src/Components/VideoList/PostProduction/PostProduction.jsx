import DefaultChannelIcon from "../../../Icons/profile.svg";
import ArrowDiagonal from "../../../Icons/arrowdiagonal.svg";
import "./PostProduction.css";
import { useState } from "react";

function PostProduction() {
  const [projectLink, setProjectLink] = useState("");

  return (
    <div className="long-format-video-list">
      <div className="top-details">
        <p className="client-name">Video Information</p>{" "}
        <p className="video-list-header"></p>
      </div>
      <div className="video-list-tabs">
        <p className="video-name-in-organize">Video Name</p>
      </div>
      <hr />
      <div className="icon-with-channel-name-content">
        <div className="default-channel-icon-div">
          <img
            className="default-channel-icon"
            src={DefaultChannelIcon}
            alt="Default channel icon"
          />
        </div>
        <p className="channel-name">Channel name</p>
      </div>
      <hr />
      <div className="text-with-input-information">
        <p className="widget-text">Dropbox Location</p>
        <input
          className="widget-input"
          type="text"
          placeholder={projectLink}
          value={projectLink}
          readOnly
        />
        <button className="arrow-diagonal">↗</button>
      </div>
      <button className="post-production-button">POST-PRODUCE</button>
    </div>
  );
}

export default PostProduction;
