import DefaultChannelIcon from "../../../Icons/profile.svg";
import ArrowDiagonal from "../../../Icons/arrowdiagonal.svg";
import "./Organize.css";
import { useState } from "react";
import { useGlobalContext } from "../../../Context/globalContext";

function Organize() {
  const [dropboxLocation, setDropboxLocation] = useState("");
  const [scriptLink, setScriptLink] = useState("");
  const [trelloTicket, setTrelloTicket] = useState("");
  const { isOrganizeVisible, setIsOrganizeVisible } = useGlobalContext();

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
              placeholder={dropboxLocation}
              value={dropboxLocation}
            />
            <button className="arrow-diagonal">↗</button>
          </div>
          <div className="text-with-input-information">
            <p className="widget-text">Script Link</p>
            <input
              className="widget-input"
              type="text"
              placeholder={scriptLink}
              value={scriptLink}
            />
            <button className="arrow-diagonal">↗</button>
          </div>
          <div className="text-with-input-information">
            <p className="widget-text">Trello Ticket</p>
            <input
              className="widget-input"
              type="text"
              placeholder={trelloTicket}
              value={trelloTicket}
            />
            <button className="arrow-diagonal">↗</button>
          </div>
          <button className="organize-button">ORGANIZE</button>
          <button onClick={toggleOrganizeModal} className="go-back-button">
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Organize;
