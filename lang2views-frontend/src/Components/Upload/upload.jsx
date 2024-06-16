import "./upload.css";
import React, { useState } from "react";
import CloseUploadPopup from "./CloseUploadPopup";
import UploadHeader from "./uploadHeader";
import UploadButton from "./uploadStep";

function youtubeLinkButton() {
    const urlInput = document.querySelector("#youtubeLink-input");
    if (urlInput.value === '') {
        console.log("Error: No Target URL");
        return;
    }

    window.open(urlInput.value);
}


function Upload(props) {
  if (props === null) {
    throw new Error("No props for Upload");
  }

  return (
    <>
      <div
        className="upload-close-area"
        onClick={CloseUploadPopup}
      ></div>
      <div className="upload-popup">
        <div id="upload-header" className="ms-4">
          <UploadHeader sampleVideoName="Sample Video Name" />
        </div>
        <div className="upload-buttons-section">
                  {props.sampleVideoName }
        </div>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <p className="mt-5 mb-3 fs-4 ms-5">
          <img className="me-3" src="../brown.png" />
          ChannelName
        </p>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <div className="popup-menus-step-area">
            <div className="ms-5 side-by-side">
                <h2>Youtube Link</h2>
                <label htmlFor="youtubeLink-input"></label>
                <input className="form-control form-control-lg" id="youtubeLink-input"></input>
                <button className="btn btn-default" id="link-button" onClick={youtubeLinkButton}>&#8599;</button>
            </div>
            <div className="horizontal-line"></div>
            <UploadButton />
        </div>
      </div>
    </>
  );
}

export default Upload;
