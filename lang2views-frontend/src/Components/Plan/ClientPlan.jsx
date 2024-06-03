import { useState } from "react";
import CloseClientPlanPopup from "./CloseClientPlanPopup";
import "./clientPlan.css";
import ClientPlanHeader from "./ClientPlanHeader";
import ClientPlanVideoList from "./LongFormatVideos/ClientPlanVideoList";
import channelIcon from "../../Icons/profile.svg";

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
      <div className="client-plan-popup">
        <div id="client-plan-header" className="ms-4">
                  <ClientPlanHeader clientName={channelName} />
        </div>
        <div className="client-plan-button-section">
          <button
            id="long-tab"
            className="me-4 fs-2 ms-5 btn btn-link text-decoration-none text-reset rounded-0 current-tab"
            onClick={switchToLongFormat}
          >
            Long format
          </button>
          <button
            id="short-tab"
            className="mx-3 fs-2 btn btn-link text-decoration-none text-reset rounded-0"
            onClick={switchToShortFormat}
          >
            Short
          </button>
        </div>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <p className="mt-5 mb-3 fs-4 ms-5">
          <img className="me-3 channel-icon-dimensions" src={channelIcon} />
          {channelName}
        </p>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <div className="popup-menus-step-area">
                <ClientPlanVideoList channelId={channelId} format={currentFormat} />
        </div>
        <div id="videos-for-processing-json" hidden={true}>{videosToProcessContainer}</div>
      </div>
    </>
  );
}

export default ClientPlan;
