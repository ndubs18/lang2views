import "./ClientVideoListContainer.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LongFormatIndividualVideo from "../IndividualVideo/IndividualVideo";
import DefaultChannelIcon from "../../../Icons/profile.svg";
import SearchIcon from "../../../Icons/search.svg";
import BlankCheckbox from "../../../Icons/blank_check_box.svg";
import BlackCheckbox from "../../../Icons/check_box.svg";
import OrganizePanel from "../Organize/Organize";
import PostProductionPanel from "../PostProduction/PostProduction";
import UploadPanel from "../Upload/Upload";
import { GlobalContextProvider } from "../../../Context/globalContext";

function ClientVideoListContainer({initialFormat}) {
    const [checkbox, setCheckbox] = useState(false);
    const [client, setClient] = useState(null);
    const [videoList, setVideoList] = useState([]);
    const [currentVideoId, setCurrentVideoId] = useState("default");
    const { channelId } = useParams()

    let currentFormat = initialFormat;

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

    let individualShortVideos = [];
    let individualLongVideos = [];

    videoList.forEach((video) => {
        let newVideo = <LongFormatIndividualVideo
            key={video.id}
            videoNumber={video.number}
            videoName={video.name}
            thumbnailImage={video.thumbnail.url}
            videoId={video.id}
            sendVideoId={handleCurrentVideoId}
        />
        if (video.format == "short") {
            individualShortVideos.push(newVideo);
        } else {
            individualLongVideos.push(newVideo);
        }
    })

    let channelName = "Loading..."
    if (client) {
        channelName = client.channelName
    }

    function getVideoFromId(videoId) {
        return videoList.filter((video) => { return video.id == videoId; })[0]
    }

    // Used to process when one of a child individual video's buttons is pressed;
    // updates the video id used to send a video over to the relevant popup modal
    function handleCurrentVideoId(data) {
        setCurrentVideoId(data);
    }

    function handleCurrentFormat(format) {
        currentFormat = format;
        const shortContainer = document.getElementById(`short-list-container`);
        const longContainer = document.getElementById(`long-list-container`);
        const shortTabButton = document.getElementById(`short-tab`);
        const longTabButton = document.getElementById(`long-tab`);

        if (format == "short") {
            shortContainer.style.display = "flex";
            longContainer.style.display = "none";
            shortTabButton.classList.add("current-tab")
            longTabButton.classList.remove("current-tab")
        } else {
            longContainer.style.display = "flex";
            shortContainer.style.display = "none";
            longTabButton.classList.add("current-tab")
            shortTabButton.classList.remove("current-tab")
        }
    }

    // Workaround for not being able to set handleCurrentFormat as an onclick event
    // with a specific arg. Could get around this by having these buttons be their own
    // React components but that could be done later
    function switchToLongFormat() {
        if (currentFormat != "long") { 
            handleCurrentFormat("long")
        }
    }
    function switchToShortFormat() {
        if (currentFormat != "short") {
            handleCurrentFormat("short")
        }
    }

  return (
    <GlobalContextProvider>
      <div className="video-list">
      <div className="top-details">
        <p className="client-name">{channelName}</p>{" "}
        <p className="video-list-header"></p>
      </div>
      <div className="video-list-tabs">
        <button
        id="long-tab"
            className="long-format btn btn-link bg-white fs-2 text-decoration-none rounded-0 current-tab"
            onClick={switchToLongFormat}
        >
            Long Format
        </button>
        <button
        id="short-tab"
            className="short-format btn btn-link bg-white fs-2 text-decoration-none rounded-0"
            onClick={switchToShortFormat}
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
      <OrganizePanel channelId={channelId} channelName={channelName} video={getVideoFromId(currentVideoId)} />
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
              <div id="short-list-container" className="all-videos" style={{ display: "none" } }>
                  {individualShortVideos}
            </div>
              <div id="long-list-container" className="all-videos">
                  {individualLongVideos}
            </div>
    </div>
    </GlobalContextProvider>
  );
}

export default ClientVideoListContainer;
