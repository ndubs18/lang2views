import "./longFormatVideoList.css";
import { useState } from "react";
import placeholderIcon from "../../../Images/brown.png";
import LongFormatIndividualVideo from "../IndividualVideo/longFormatIndividualVideo";
import DefaultChannelIcon from "../../../Icons/profile.svg";
import SearchIcon from "../../../Icons/search.svg";
import BlankCheckbox from "../../../Icons/blank_check_box.svg";
import BlackCheckbox from "../../../Icons/check_box.svg";

function longFormatVideoList() {
  const [checkbox, setCheckbox] = useState(false);

  return (
    <div className="long-format-video-list">
      <div className="top-details">
        <p className="client-name">Client Name</p>{" "}
        <p className="video-list-header"></p>
      </div>
      <div className="video-list-tabs">
        <p className="long-format">Long Format</p>
        <p className="short-format">Short</p>
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
      <div className="search-and-modify">
        <div className="search-content">
          <img className="search-icon" src={SearchIcon} alt="Search icon" />
          <input className="search-bar" />
        </div>
        <button className="modify-plan-button">Modify plan</button>
      </div>
      <div className="header-for-video-list">
        <img
          className="check-box"
          src={!checkbox ? BlankCheckbox : BlackCheckbox}
        />
        <p className="name-header">NAME</p>
        <p className="thumbnail-header">THUMBNAIL</p>
      </div>
      {/* Make a component for an individual video and loop through that component here*/}
      <div className="all-videos">
        <LongFormatIndividualVideo
          videoNumber="001."
          videoName="Video 01"
          thumbnailImage={placeholderIcon}
        />
        <LongFormatIndividualVideo
          videoNumber="002."
          videoName="Video 02"
          thumbnailImage={placeholderIcon}
        />
        <LongFormatIndividualVideo
          videoNumber="003."
          videoName="Video 03"
          thumbnailImage={placeholderIcon}
        />
      </div>
    </div>
  );
}

export default longFormatVideoList;
