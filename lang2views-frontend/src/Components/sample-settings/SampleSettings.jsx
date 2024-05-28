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

  const [videoSourceButtonActive, setVideoSourceButtonActive] = useState("active-step-button");
  const [translationButtonActive, setTranslationButtonActive] =
    useState("normal");
  const [transcriptionButtonActive, setTranscriptionButtonActive] =
    useState("normal");
  const [uploadButtonActive, setUploadButtonActive] = useState("normal");

  return (
    <>
      <div
        className="sample-settings-close-area"
        onClick={CloseSampleSettingsPopup}
      ></div>
      <div className="sample-settings-popup">
        <div id="sample-settings-header" className="ms-4">
          <SampleSettingsHeader sampleVideoName="Sample Video Name" />
        </div>
        <div className="sample-settings-button-section">
          <button
            id="sample-settings-video-source-button"
            className={
              videoSourceButtonActive +
              " me-4 fs-2 ms-5 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              SampleSettingsVideoSourceButtonClickProcessor();
              setVideoSourceButtonActive("active-step-button");
              setTranscriptionButtonActive("normal");
              setTranslationButtonActive("normal");
              setUploadButtonActive("normal");
            }}
          >
            Video Source
          </button>
          <button
            id="sample-settings-transcription-button"
            className={
              transcriptionButtonActive +
              " mx-3 fs-2 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              SampleSettingsTranscriptionButtonClickProcessor();
              setVideoSourceButtonActive("normal");
              setTranscriptionButtonActive("active-step-button");
              setTranslationButtonActive("normal");
              setUploadButtonActive("normal");
            }}
          >
            Transcription
          </button>
          <button
            id="sample-settings-translation-button"
            className={
              translationButtonActive +
              " mx-3 fs-2 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              SampleSettingsTranslationButtonClickProcessor();
              setVideoSourceButtonActive("normal");
              setTranscriptionButtonActive("normal");
              setTranslationButtonActive("active-step-button");
              setUploadButtonActive("normal");
            }}
          >
            Translation
          </button>
          <button
            id="sample-settings-upload-button"
            className={
              uploadButtonActive +
              " mx-3 fs-2 btn btn-link text-decoration-none text-reset rounded-0"
            }
            onClick={() => {
              SampleSettingsUploadButtonClickProcessor();
              setVideoSourceButtonActive("normal");
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
