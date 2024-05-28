import "./Organize.css";
import React, { useState } from "react";
import CloseOrganizePopup from "./CloseOrganizePopup";
import OrganizeHeader from "./OrganizeHeader";
import OrganizeButton from "./OrganizeStep";

function Organize(props) {
  if (props === null) {
    throw new Error("No props for Organize");
  }

  return (
    <>
      <div
        className="organize-close-area"
        onClick={CloseOrganizePopup}
      ></div>
      <div className="organize-popup">
        <div id="organize-header" className="ms-4">
          <OrganizeHeader sampleVideoName="Sample Video Name" />
        </div>
        <div className="organize-button-section">
                  {props.sampleVideoName }
        </div>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <p className="mt-5 mb-3 fs-4 ms-5">
          <img className="me-3" src="../brown.png" />
          ChannelName
        </p>
        <div className="not-full-width-horizontal-line ms-5"></div>
        <div className="popup-menus-step-area">
            <div className="text-input-container ms-5">
                <h2>Dropbox Location</h2>
                <label htmlFor="dropboxLocation-input"></label>
                <input className="form-control form-control-lg" id="dropboxLocation-input"></input>
            </div>
            <div className="text-input-container ms-5">
                <h2>Script Link</h2>
                <label htmlFor="scriptLink-input"></label>
                <input className="form-control form-control-lg" id="scriptLink-input"></input>
            </div>
            <div className="text-input-container ms-5">
                <h2>Trello Link</h2>
                <label htmlFor="trelloLink-input"></label>
                <input className="form-control form-control-lg" id="trelloLink-input"></input>
            </div>
            <div className="horizontal-line"></div>
            <OrganizeButton />
        </div>
      </div>
    </>
  );
}

export default Organize;

