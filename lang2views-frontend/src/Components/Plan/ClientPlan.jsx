import { useState } from "react";
import CloseClientPlanPopup from "./CloseClientPlanPopup";
import "./clientPlan.css";
import ClientPopupHeader from "../Clients/ClientPopupHeader";
import ClientPlanVideoList from "./ClientPlanVideoList";
import DefaultChannelIcon from "../../Icons/profile.svg";

function ClientPlan({ channelId, channelName }) {
    const [currentFormat, setCurrentFormat] = useState("long")

  const videosToProcessContainer = JSON.stringify([]);

    function handleCurrentFormat(format) {
        setCurrentFormat(format);
        const shortTabButton = document.getElementById(`short-tab`);
        const longTabButton = document.getElementById(`long-tab`);

        if (format == "short") {
            shortTabButton.classList.add("current-tab")
            longTabButton.classList.remove("current-tab")
        } else {
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
    <>
      <div
        className="client-plan-close-area"
        onClick={CloseClientPlanPopup}
      ></div>
      <div className="client-popup">
        <ClientPopupHeader channelName={channelName} headerText={"Plan"} />
        <div className="client-plan-button-section">
          <button
            id="long-tab"
            className="long-format btn btn-link bg-white fs-2 text-decoration-none rounded-0 current-tab"
            onClick={switchToLongFormat}
          >
            Long format
          </button>
          <button
            id="short-tab"
            className="short-format btn btn-link bg-white fs-2 text-decoration-none rounded-0"
            onClick={switchToShortFormat}
          >
            Short
          </button>
        </div>
        <hr style={{ margin: "0", marginTop: "10px" }} />
        <div className="icon-with-channel-name-content">
            <div className="default-channel-icon-div">
                <img
                    className="default-channel-icon"
                    src={DefaultChannelIcon}
                    alt="Default channel icon" />
            </div>
            <p className="channel-name">{channelName}</p>
        </div>
        <hr style={{ margin: "0" }} />
        <div className="popup-menus-step-area">
            <ClientPlanVideoList channelId={channelId} format={currentFormat} />
        </div>
        <div id="videos-for-processing-json" hidden={true}>{videosToProcessContainer}</div>
      </div>
    </>
  );
}

export default ClientPlan;
