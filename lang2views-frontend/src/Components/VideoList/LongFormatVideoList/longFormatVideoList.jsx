import "./longFormatVideoList.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LongFormatIndividualVideo from "../IndividualVideo/longFormatIndividualVideo";
import DefaultChannelIcon from "../../../Icons/profile.svg";
import SearchIcon from "../../../Icons/search.svg";
import BlankCheckbox from "../../../Icons/blank_check_box.svg";
import BlackCheckbox from "../../../Icons/check_box.svg";
import OrganizePanel from "../Organize/Organize";
import PostProductionPanel from "../PostProduction/PostProduction";
import UploadPanel from "../Upload/Upload";
import { GlobalContextProvider } from "../../../Context/globalContext";

function LongFormatVideoList() {
    const [checkbox, setCheckbox] = useState(false);
    const [client, setClient] = useState(null);
    const [videoList, setVideoList] = useState([]);
    const { channelId } = useParams()

    useEffect(() => {
        fetch("http://localhost:3000/client/getAddedVideos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
            }),
        }).then((response) => {
            response
                .json()
                .then((value) => setVideoList(value))
                .catch((err) => {
                    throw new Error(err);
                })
        });
        fetch("http://localhost:3000/client/get", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
            }),
        }).then((response) => {
            response
                .json()
                .then((value) => {setClient(value)})
                .catch((err) => {
                    throw new Error(err);
                })
        });
    }, []);
    console.log(videoList)
    const individualVideos = [];
    videoList.forEach((video) => {
        individualVideos.push(<LongFormatIndividualVideo
            videoNumber={ video.number }
            videoName={ video.name }
            thumbnailImage={ video.thumbnail.url }
        />)
    })

    let channelName = "Loading..."
    if (client) {
        channelName = client.channelName
    }


  return (
    <GlobalContextProvider>
    <div className="long-format-video-list">
      <div className="top-details">
                  <p className="client-name">{channelName}</p>{" "}
        <p className="video-list-header"></p>
      </div>
      <div className="video-list-tabs">
      
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
                  <p className="channel-name">{channelName}</p>
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
      <div className="all-videos">
        {individualVideos}
      </div>
    </div>
    </GlobalContextProvider>
  );
}

export default LongFormatVideoList;
