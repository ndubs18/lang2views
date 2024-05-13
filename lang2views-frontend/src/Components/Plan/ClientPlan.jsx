import { useState } from "react";
import CloseClientPlanPopup from "./CloseClientPlanPopup";
import "./clientPlan.css";
import ClientPlanHeader from "./ClientPlanHeader";
import LongFormatVideoList from "./LongFormatVideoList";
import ClientPlanShortsButtonClickProcessor from "./ClientPlanShortsButtonClickProcessor";
import ClientPlanLongFormatButtonClickProcessor from "./ClientPlanLongFormatButtonClickProcessor";

function ClientPlan() {
  const [longFormatButtonActive, setLongFormatButtonActive] =
    useState("active-step-button");
  const [shortsButtonActive, setShortsButtonActive] = useState("normal");

  return (
    <>
      <div
        className="client-plan-close-area"
        onClick={CloseClientPlanPopup}
      ></div>
      <div className="client-plan-popup">
        {" "}
        <div id="client-plan-header" className="ms-4">
          <ClientPlanHeader clientName="ClientName" />
        </div>
        <div className="client-plan-button-section">
          <button
            id="client-plan-long-format-button"
            className={
              longFormatButtonActive +
              " me-4 fs-2 ms-5 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              ClientPlanLongFormatButtonClickProcessor();
              setLongFormatButtonActive("active-step-button");
              setShortsButtonActive("normal");
            }}
          >
            Long format
          </button>
          <button
            id="client-plan-shorts-button"
            className={
              shortsButtonActive +
              " mx-3 fs-2 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              ClientPlanShortsButtonClickProcessor();
              setLongFormatButtonActive("normal");
              setShortsButtonActive("active-step-button");
            }}
          >
            Short
          </button>
        </div>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <p className="mt-5 mb-3 fs-4 ms-5">
          <img className="me-3" src="../brown.png" />
          ChannelName
        </p>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <div className="popup-menus-step-area">
          <LongFormatVideoList />
        </div>
      </div>
    </>
  );
}

export default ClientPlan;
