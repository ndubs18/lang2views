import "../clientSettings.css";
import Save from "./UploadStepSave";
import { useState } from "react";

function disableGrantYoutubeAccess() {
  const sectionValue = document.querySelector(
    ".grant-youtube-access-section-value"
  );

  sectionValue.textContent = "do not grant youtube access";
}

function enableGrantYoutubeAccess() {
  const sectionValue = document.querySelector(
    ".grant-youtube-access-section-value"
  );

  sectionValue.textContent = "grant youtube access";
}

function disableUseSameDescription() {
  const sectionValue = document.querySelector(
    ".use-same-description-section-value"
  );

  sectionValue.textContent = "do not use same description";
}

function enableUseSameDescription() {
  const sectionValue = document.querySelector(
    ".use-same-description-section-value"
  );

  sectionValue.textContent = "use same description";
}

function disableUseSameTags() {
  const sectionValue = document.querySelector(".use-same-tags-section-value");

  sectionValue.textContent = "do not use same tags";
}

function enableUseSameTags() {
  const sectionValue = document.querySelector(".use-same-tags-section-value");

  sectionValue.textContent = "use same tags";
}

function GrantYoutubeAccess() {
  return (
    <div className="mb-3">
      <h2 className="ms-5 mb-2">Grant YouTube Access</h2>
      <div className="d-flex flex-row justify-content-between ms-5">
        <div className="d-flex flex-row">
          <button className="pale-green-button youtube-login px-3 py-2">
            <span className="d-flex flex-row justify-content-center">
              <p className="align-self-center mb-0 me-2">Log in</p>
              <img className="" src="./brown.png" />
            </span>
          </button>
        </div>
        <GrantYoutubeAccessToggles />
      </div>
      <div className="grant-youtube-access-section-value" hidden></div>
    </div>
  );
}

function GrantYoutubeAccessToggles() {
  const [disableYoutubeAccessActive, setDisableYoutubeAccessActive] = useState(
    "upload-step-toggle-not-active"
  );
  const [enableYoutubeAccessActive, setEnableYoutubeAccessActive] = useState(
    "upload-step-toggle-active"
  );

  return (
    <div>
      <button
        className={
          disableYoutubeAccessActive +
          " btn btn-link text-decoration-none text-reset fs-4"
        }
        onClick={() => {
          disableGrantYoutubeAccess();
          setDisableYoutubeAccessActive("upload-step-toggle-active");
          setEnableYoutubeAccessActive("upload-step-toggle-not-active");
        }}
      >
        Disabled
      </button>
      <button
        className={
          enableYoutubeAccessActive +
          " btn btn-link text-decoration-none text-reset fs-4"
        }
        onClick={() => {
          enableGrantYoutubeAccess();
          setEnableYoutubeAccessActive("upload-step-toggle-active");
          setDisableYoutubeAccessActive("upload-step-toggle-not-active");
        }}
      >
        Enabled
      </button>
    </div>
  );
}

function UseSameDescriptionToggles() {
  const [notUseSameDescriptionActive, setNotUseSameDescriptionActive] =
    useState("upload-step-toggle-not-active");
  const [useSameDescriptionActive, setUseSameDescriptionActive] = useState(
    "upload-step-toggle-active"
  );

  return (
    <div>
      <button
        className={
          notUseSameDescriptionActive +
          " btn btn-link text-decoration-none text-reset fs-4"
        }
        onClick={() => {
          disableUseSameDescription();
          setNotUseSameDescriptionActive("upload-step-toggle-active");
          setUseSameDescriptionActive("upload-step-toggle-not-active");
        }}
      >
        Disabled
      </button>
      <button
        className={
          useSameDescriptionActive +
          " btn btn-link text-decoration-none text-reset fs-4"
        }
        onClick={() => {
          enableUseSameDescription();
          setUseSameDescriptionActive("upload-step-toggle-active");
          setNotUseSameDescriptionActive("upload-step-toggle-not-active");
        }}
      >
        Enabled
      </button>
    </div>
  );
}

function UseSameTagsToggles() {
  const [notUseSameTagsActive, setNotUseSameTagsActive] = useState(
    "upload-step-toggle-not-active"
  );
  const [useSameTagsActive, setUseSameTagsActive] = useState(
    "upload-step-toggle-active"
  );

  return (
    <div>
      <button
        className={
          notUseSameTagsActive +
          " btn btn-link text-decoration-none text-reset fs-4"
        }
        onClick={() => {
          disableUseSameTags();
          setNotUseSameTagsActive("upload-step-toggle-active");
          setUseSameTagsActive("upload-step-toggle-not-active");
        }}
      >
        Disabled
      </button>
      <button
        className={
          useSameTagsActive +
          " btn btn-link text-decoration-none text-reset fs-4"
        }
        onClick={() => {
          enableUseSameTags();
          setUseSameTagsActive("upload-step-toggle-active");
          setNotUseSameTagsActive("upload-step-toggle-not-active");
        }}
      >
        Enabled
      </button>
    </div>
  );
}

function UseSameDescription() {
  return (
    <div id="use-same-description-container" className="ms-5">
      <h2>Use same description</h2>
      <UseSameDescriptionToggles />
      <div className="use-same-description-section-value" hidden></div>
    </div>
  );
}

function UseSameTags() {
  return (
    <div id="use-same-tags-container" className="ms-5">
      <h2>Use same tags</h2>
      <UseSameTagsToggles />
      <div className="use-same-tags-section-value" hidden></div>
    </div>
  );
}

function Description() {
  return (
    <div className="text-input-container w-100 ms-5 d-flex flex-column align-items-start">
      <h2>Description</h2>
      <label htmlFor="description-input"></label>
      <textarea
        className="form-control form-control-lg small-text-area"
        id="description-input"
      ></textarea>
    </div>
  );
}

function NumTags() {
  return (
    <div className="text-input-container w-100 ms-5 mt-5 d-flex flex-column align-items-start">
      <h2># Tags</h2>
      <label htmlFor="num-tags-input"></label>
      <textarea
        className="form-control form-control-lg small-text-area"
        id="num-tags-input"
      ></textarea>
    </div>
  );
}

function Upload(props) {
  if (props === null)
    return new Error("props for YoutubeAccess in client settings is null");

  if (props.channelName === null)
    return new Error("No channelName for upload section of clientSettings");

  return (
    <div>
      <GrantYoutubeAccess />
      <UseSameDescription />
      <UseSameTags />
      <Description />
      <NumTags />
      <div className="horizontal-line"></div>
      <Save />
    </div>
  );
}

export default Upload;
