import DefaultChannelIcon from "../../../Icons/profile.svg";
import "./Organize.css";
import { useState } from "react";
import { useGlobalContext } from "../../../Context/globalContext";

function Organize({ channelId, channelName, video }) {
  const [organizeData, setOrganizeData] = useState("");
  const { isOrganizeVisible, setIsOrganizeVisible } = useGlobalContext();
    let dropboxUrl = ""
    let scriptUrl = ""
    let trelloUrl = ""
    console.log("body:")
    console.log(JSON.stringify({
        channelId: channelId,
        videoId: video.id,
        lang: "es",
    }))
    const organizeVideo = async () => {
        fetch("http://localhost:3000/client/organizeVideo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
                videoId: video.id,
                lang: "es",
            }),
        }).then((response) => {
            response
                .json()
                .then((value) => setOrganizeData(value))
                .catch((err) => {
                    throw new Error(err);
                })
        });
    }
    console.log("organize data:")
    console.log(organizeData)
    dropboxUrl = organizeData.dropboxUrl;
    scriptUrl = organizeData.scriptUrl;
    trelloUrl = organizeData.trelloUrl;

  if (!isOrganizeVisible) return null;
  function toggleOrganizeModal() {
    if (isOrganizeVisible) {
      setIsOrganizeVisible(false);
    } else {
      setIsOrganizeVisible(true);
    }
    }

  return (
    <div className="organize-overlay">
      <div className="organize-content">
        <div className="long-format-video-list">
          <div className="top-details">
            <p className="client-name">Video Information</p>{" "}
            <p className="video-list-header"></p>
          </div>
          <div className="video-list-tabs">
            <p className="video-name-in-organize">{video.name}</p>
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
          <div className="text-with-input-information">
            <p className="widget-text">Dropbox Location</p>
            <input
              className="widget-input"
              type="text"
              placeholder={dropboxUrl}
              value={dropboxUrl}
            />
            <button className="arrow-diagonal">↗</button>
          </div>
          <div className="text-with-input-information">
            <p className="widget-text">Script Link</p>
            <input
              className="widget-input"
              type="text"
              placeholder={scriptUrl}
              value={scriptUrl}
            />
            <button className="arrow-diagonal">↗</button>
          </div>
          <div className="text-with-input-information">
            <p className="widget-text">Trello Ticket</p>
            <input
              className="widget-input"
              type="text"
              placeholder={trelloUrl}
              value={trelloUrl}
            />
            <button className="arrow-diagonal">↗</button>
          </div>
          <button onClick={organizeVideo} className="organize-button">ORGANIZE</button>
          <button onClick={toggleOrganizeModal} className="go-back-button">
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Organize;
