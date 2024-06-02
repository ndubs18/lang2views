import "./shortFormatVideoList.css";
import { useContext, useState } from "react";
import placeholderIcon from "../../../Images/brown.png";
import ShortFormatIndividualVideo from "../IndividualVideo/shortFormatIndividualVideo";
import DefaultChannelIcon from "../../../Icons/profile.svg";
import SearchIcon from "../../../Icons/search.svg";
import BlankCheckbox from "../../../Icons/blank_check_box.svg";
import BlackCheckbox from "../../../Icons/check_box.svg";
import OrganizePanel from "../Organize/Organize";
import PostProductionPanel from "../PostProduction/PostProduction";
import UploadPanel from "../Upload/Upload";
import LongFormatVideoListButtonClickProcessor from "../LongFormatVideoList/LongFormatVideoListButtonClickProcessor";
import ShortFormatVideoListButtonClickProcessor from "./ShortFormatVideoListButtonClickProcessor";
import { GlobalContextProvider } from "../../../Context/globalContext";

function createVideoList(videoList) {
  const videos = [];

  if (videoList === null)
    videoList = [];

  for (let i = 0; i < videoList.length; i++) {
    const video = (<ShortFormatIndividualVideo
            videoNumber={i + "."}
            videoName={videoList[i].title}
            thumbnailImage={""}
          />)

    videos.push(video);
  }

  return videos;
}

function ShortFormatVideoList() {
  const [checkbox, setCheckbox] = useState(false);
  const clientName = localStorage.getItem("clientName");

  const videoListFromLocalStorage = JSON.parse(localStorage.getItem("shortsForProcessing"));

  const videos = createVideoList(videoListFromLocalStorage);

  return (
    <GlobalContextProvider>
      <div className="long-format-video-list">
        <div className="top-details">
          <p className="client-name">{clientName}</p>{" "}
          <p className="video-list-header"></p>
        </div>
        <div className="video-list-tabs">
          <button
            className="long-format-in-short-format btn btn-link bg-white fs-2 text-decoration-none rounded-0"
            onClick={LongFormatVideoListButtonClickProcessor}
          >
            Long Format
          </button>
          <button
            className="short-format-in-short-format btn btn-link bg-white fs-2 text-decoration-none rounded-0"
            onClick={ShortFormatVideoListButtonClickProcessor}
          >
            Short
          </button>
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
          {videos}
        </div>
      </div>
    </GlobalContextProvider>
  );
}

export default ShortFormatVideoList;
