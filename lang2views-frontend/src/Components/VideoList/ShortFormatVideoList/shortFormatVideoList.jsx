import "./shortFormatVideoList.css";
import { useState } from "react";
import placeholderIcon from "../../../Images/brown.png";
import ShortFormatIndividualVideo from "../IndividualVideo/shortFormatIndividualVideo";
import DefaultChannelIcon from "../../../Icons/profile.svg";
import SearchIcon from "../../../Icons/search.svg";
import BlankCheckbox from "../../../Icons/blank_check_box.svg";
import BlackCheckbox from "../../../Icons/check_box.svg";
import OrganizePanel from "../Organize/Organize";
import PostProductionPanel from "../PostProduction/PostProduction";
import UploadPanel from "../Upload/Upload";

function shortFormatVideoList() {
  const [checkbox, setCheckbox] = useState(false);

  return (
    <div className="long-format-video-list">
      <div className="top-details">
        <p className="client-name">Client Name</p>{" "}
        <p className="video-list-header"></p>
      </div>
      <div className="video-list-tabs">
        <p className="long-format-in-short-format">Long Format</p>
        <p className="short-format-in-short-format">Short</p>
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
      <OrganizePanel />
      <PostProductionPanel />
      <UploadPanel />
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
        <ShortFormatIndividualVideo videoNumber="001." videoName="Video 01" />
        <ShortFormatIndividualVideo videoNumber="002." videoName="Video 02" />
        <ShortFormatIndividualVideo videoNumber="003." videoName="Video 03" />
      </div>
    </div>
  );
}

export default shortFormatVideoList;
