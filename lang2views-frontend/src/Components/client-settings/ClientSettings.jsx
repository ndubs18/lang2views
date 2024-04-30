import "./clientSettings.css";
import React, { useState } from "react";
import CloseClientSettingsPopup from "./CloseClientSettingsPopup";
import ClientSettingsPlanButtonClickProcessor from "./buttons/ClientSettingsPlanButtonClickProcessor";
import ClientSettingsTranscriptionButtonClickProcessor from "./buttons/ClientSettingsTranscriptionButtonClickProcessor";
import Plan from "./buttons/Plan";
import ClientSettingsTranslationButtonClickProcessor from "./buttons/ClientSettingsTranslationButtonClickProcessor";
import ClientSettingsUploadButtonClickProcessor from "./buttons/ClientSettingsUploadButtonClickProcessor";
import ClientSettingsHeader from "./ClientSettingsHeader";

function ClientSettings(props) {
  if (props === null) {
    throw new Error("No props for ClientSettings");
  }

  return (
    <>
      <div
        className="client-settings-close-area"
        onClick={CloseClientSettingsPopup}
      ></div>
      <div className="client-settings-popup">
        <div id="client-settings-header" className="ms-4">
          <ClientSettingsHeader clientName="Alex" />
        </div>
        <div className="client-settings-button-section">
          <button
            id="client-settings-plan-button"
            className="me-4 fs-2 ms-5 btn btn-link text-decoration-none text-reset"
            onClick={ClientSettingsPlanButtonClickProcessor}
          >
            Plan
          </button>
          <button
            id="client-settings-transcription-button"
            className="mx-5 fs-2 btn btn-link text-decoration-none text-reset"
            onClick={ClientSettingsTranscriptionButtonClickProcessor}
          >
            Transcription
          </button>
          <button
            id="client-settings-translation-button"
            className="mx-5 fs-2 btn btn-link text-decoration-none text-reset"
            onClick={ClientSettingsTranslationButtonClickProcessor}
          >
            Translation
          </button>
          <button
            id="client-settings-upload-button"
            className="mx-5 fs-2 btn btn-link text-decoration-none text-reset"
            onClick={ClientSettingsUploadButtonClickProcessor}
          >
            Upload
          </button>
        </div>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <p className="mt-5 mb-3 fs-4 ms-5">Alex</p>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <div className="popup-menus-step-area">
          <Plan />
        </div>
      </div>
    </>
  );
}

export default ClientSettings;
