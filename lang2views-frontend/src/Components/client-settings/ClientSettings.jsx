import "./clientSettings.css";
import React, { useState } from "react";
import CloseClientSettingsPopup from "./CloseClientSettingsPopup";
import ClientSettingsPlanButtonClickProcessor from "./buttons/ClientSettingsPlanButtonClickProcessor";
import ClientSettingsTranscriptionButtonClickProcessor from "./buttons/ClientSettingsTranscriptionButtonClickProcessor";
import Plan from "./buttons/Plan";

function ClientSettings(props) {
  if (props === null) {
    throw new Error("No props for ClientSettings");
  }

  return (
    <>
      <div className="client-settings-close-area" onClick={CloseClientSettingsPopup}></div>
      <div className="client-settings-popup d-flex flex-direction-column align-items-start">
        <button onClick={ClientSettingsPlanButtonClickProcessor}>Plan</button>
        <button onClick={ClientSettingsTranscriptionButtonClickProcessor}>Transcription</button>
        <div className="popup-menus-step-area">
          <Plan channelName={props.channelName}/>
        </div>
      </div>
    </>
  );
}

export default ClientSettings;
