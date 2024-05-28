import "./postProduction.css";
import React, { useState } from "react";
import ClosePostProductionPopup from "./ClosePostProductionPopup";
import PostProductionHeader from "./postProductionHeader";
import PostProduceButton from "./postProductionStep";

function PostProduction(props) {
  if (props === null) {
    throw new Error("No props for PostProduction");
  }

  return (
    <>
      <div
        className="post-production-close-area"
        onClick={ClosePostProductionPopup}
      ></div>
      <div className="post-production-popup">
        <div id="post-production-header" className="ms-4">
          <PostProductionHeader sampleVideoName="Sample Video Name" />
        </div>
        <div className="post-production-button-section">
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
                <h2>Link to Project</h2>
                <label htmlFor="projectLink-input"></label>
                <input className="form-control form-control-lg" id="projectLink-input"></input>
            </div>
            <div className="horizontal-line"></div>
            <PostProduceButton />
        </div>
      </div>
    </>
  );
}

export default PostProduction;
