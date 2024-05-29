import "./longFormatVideoList.css";
import { useState } from "react";
import placeholderIcon from "../../Images/brown.png";

function longFormatVideoList() {
  const [checkbox, setCheckbox] = useState(false);

  return (
    <div className="long-format-video-list">
      <div className="top-details">
        <p className="client-name">Client Name</p>{" "}
        <p className="video-list-header"></p>
      </div>
      <div className="video-list-tabs">
        <p>Long Format</p>
        <p>Short</p>
      </div>
      <hr />
      <div className="icon-with-channel-name-content">
        <div className="default-channel-icon-div">
          <img
            className="default-channel-icon"
            src={placeholderIcon}
            alt="Default channel icon"
          />
        </div>
        <p className="channel-name">Channel name</p>
      </div>
      <hr />
      <div className="search-and-modify">
        <div className="search-content">
          <img
            className="search-icon"
            src={placeholderIcon}
            alt="Search icon"
          />
          <input className="search-bar" />
        </div>
        <button className="modify-plan-button">Modify plan</button>
      </div>
      <div className="header-for-video-list">
        <img
          className="check-box"
          src={!checkbox ? placeholderIcon : placeholderIcon}
        />
        <p className="name-header">NAME</p>
        <p className="thumbnail-header">THUMBNAIL</p>
        {/* Make a component for an individual video and loop through that component here*/}
      </div>
    </div>
  );
}

export default longFormatVideoList;
