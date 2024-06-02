import "./clientSettings.css";
import React, { useContext, useState } from "react";
import CloseClientSettingsPopup from "./CloseClientSettingsPopup";
import ClientSettingsPlanButtonClickProcessor from "./buttons/ClientSettingsPlanButtonClickProcessor";
import ClientSettingsTranscriptionButtonClickProcessor from "./buttons/ClientSettingsTranscriptionButtonClickProcessor";
import Plan from "./buttons/Plan";
import ClientSettingsTranslationButtonClickProcessor from "./buttons/ClientSettingsTranslationButtonClickProcessor";
import ClientSettingsUploadButtonClickProcessor from "./buttons/ClientSettingsUploadButtonClickProcessor";
import ClientSettingsHeader from "./ClientSettingsHeader";
import { channelNameContext } from "./channelNameContext";
import { clientNameContext } from "./clientNameContext";
import channelIcon from "../../Icons/profile.svg";

function ClientSettings() {
  const [planButtonActive, setPlanButtonActive] = useState("active-step-button");
  const [translationButtonActive, setTranslationButtonActive] =
    useState("normal");
  const [transcriptionButtonActive, setTranscriptionButtonActive] =
    useState("normal");
  const [uploadButtonActive, setUploadButtonActive] = useState("normal");

  return (
    <>
      <div
        className="client-settings-close-area"
        onClick={CloseClientSettingsPopup}
      ></div>
      <div className="client-settings-popup">
        <div id="client-settings-header" className="ms-4">
          <ClientSettingsHeader clientName={clientNameContext.Provider} />
        </div>
        <div className="client-settings-button-section">
          <button
            id="client-settings-plan-button"
            className={
              planButtonActive +
              " me-4 fs-2 ms-5 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              ClientSettingsPlanButtonClickProcessor();
              setPlanButtonActive("active-step-button");
              setTranscriptionButtonActive("normal");
              setTranslationButtonActive("normal");
              setUploadButtonActive("normal");
            }}
          >
            Plan
          </button>
          <button
            id="client-settings-transcription-button"
            className={
              transcriptionButtonActive +
              " mx-3 fs-2 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              ClientSettingsTranscriptionButtonClickProcessor();
              setPlanButtonActive("normal");
              setTranscriptionButtonActive("active-step-button");
              setTranslationButtonActive("normal");
              setUploadButtonActive("normal");
            }}
          >
            Transcription
          </button>
          <button
            id="client-settings-translation-button"
            className={
              translationButtonActive +
              " mx-3 fs-2 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              ClientSettingsTranslationButtonClickProcessor();
              setPlanButtonActive("normal");
              setTranscriptionButtonActive("normal");
              setTranslationButtonActive("active-step-button");
              setUploadButtonActive("normal");
            }}
          >
            Translation
          </button>
          <button
            id="client-settings-upload-button"
            className={
              uploadButtonActive +
              " mx-3 fs-2 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              ClientSettingsUploadButtonClickProcessor();
              setPlanButtonActive("normal");
              setTranscriptionButtonActive("normal");
              setTranslationButtonActive("normal");
              setUploadButtonActive("active-step-button");
            }}
          >
            Upload
          </button>
        </div>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <p className="mt-5 mb-3 fs-4 ms-5">
          <img className="me-3 channel-icon-dimensions" src={channelIcon}/>
          channelName
        </p>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <div className="popup-menus-step-area">
          <Plan />
        </div>
      </div>
    </>
  );
}

export default ClientSettings;
