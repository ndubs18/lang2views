import "./sampleSettings.css";
import React, { useState } from "react";
import CloseSampleSettingsPopup from "./CloseSampleSettingsPopup";
import SampleSettingsVideoSourceButtonClickProcessor from "./buttons/SampleSettingsVideoSourceButtonClickProcessor";
import SampleSettingsTranscriptionButtonClickProcessor from "./buttons/SampleSettingsTranscriptionButtonClickProcessor";
import SampleSettingsTranslationButtonClickProcessor from "./buttons/SampleSettingsTranslationButtonClickProcessor";
import SampleSettingsUploadButtonClickProcessor from "./buttons/SampleSettingsUploadButtonClickProcessor";
import SampleSettingsHeader from "./SampleSettingsHeader";
import VideoSource from "./buttons/VideoSource";

function SampleSettings(props) {
  if (props === null) {
    throw new Error("No props for SampleSettings");
  }

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
        onClick={CloseSampleSettingsPopup}
      ></div>
      <div className="client-settings-popup">
        <div id="client-settings-header" className="ms-4">
          <SampleSettingsHeader sampleVideoName="Sample Video Name" />
        </div>
        <div className="client-settings-button-section">
          <button
            id="client-settings-plan-button"
            className={
              planButtonActive +
              " me-4 fs-2 ms-5 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              SampleSettingsVideoSourceButtonClickProcessor();
              setPlanButtonActive("active-step-button");
              setTranscriptionButtonActive("normal");
              setTranslationButtonActive("normal");
              setUploadButtonActive("normal");
            }}
          >
            Video Source
          </button>
          <button
            id="client-settings-transcription-button"
            className={
              transcriptionButtonActive +
              " mx-3 fs-2 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              SampleSettingsTranscriptionButtonClickProcessor();
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
              SampleSettingsTranslationButtonClickProcessor();
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
              SampleSettingsUploadButtonClickProcessor();
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
          <img className="me-3" src="../brown.png" />
          ChannelName
        </p>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <div className="popup-menus-step-area">
            <VideoSource />
        </div>
      </div>
    </>
  );
}

export default SampleSettings;
