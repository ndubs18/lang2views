import React from "react";
import "./sampleCreationEntriesAndHeader.css";
import UploadButtonClickProcessor from "./UploadButtonClickProcessor";
import PostProductionButtonClickProcessor from "./PostProductionButtonClickProcessor";
import SettingsButtonClickProcessor from "./SettingsButtonClickProcessor";
import DeleteButtonClickProcessor from "./DeleteButtonClickProcessor";
import OrganizeButtonClickProcessor from "./OrganizeButtonClickProcessor";

function SampleCreationEntriesAndHeader(props) {
  const typeOfClientData = [
    "sample-creation-name-in-table-header",
    "sample-creation-video-type",
    "sample-creation-thumbnail-container",
    "sample-creation-settings-button",
    "sample-creation-organize-button",
    "sample-creation-post-production-button",
    "sample-creation-upload-button",
    "sample-creation-delete-button",
  ];

  if (props === null)
    throw new Error("props is null for function ClientEntriesAndHeader");

  if (!props.hasOwnProperty("headerData"))
    throw new Error("No value was passed for headerData");

  if (!props.hasOwnProperty("sampleCreationEntries"))
    throw new Error("No value was passed for SampleCreationEntries");

  if (!Array.isArray(props.headerData))
    throw new Error("headerData is not an array");

  if (!Array.isArray(props.sampleCreationEntries))
    throw new Error("sampleCreationEntries is not an array");

  const headerDataArray = [];
  const headerData = props.headerData;
  for (let col = 0; col < headerData.length; col++) {
    const typeOfClientDataContainer = (
      <div
        className={
          typeOfClientData[col] +
          " sample-creation-header-parts text-secondary"
        }
      >
        {headerData[col]}
      </div>
    );
    headerDataArray.push(typeOfClientDataContainer);
  }

  const headerContainer = <div className="sample-creation-table-header">{headerDataArray}</div>;

  const sampleCreationEntriesArray = [];
  for (let row = 0; row < props.sampleCreationEntries.length; row++) {
    const sampleCreationEntryDataArray = [];
    const dataForCurrentClientEntry = props.sampleCreationEntries[row];

    const name = (
      <div
        className={
          "sample-creation-name-text-container sample-creation-entry-text-container"
        }
      >
        {dataForCurrentClientEntry.name}
      </div>
    );
    sampleCreationEntryDataArray.push(name);

    const videoType = (
      <div
        className={
          typeOfClientData[1] +
          " sample-creation-entry-text-container"
        }
      >
        {dataForCurrentClientEntry.videoType}
      </div>
    );
    sampleCreationEntryDataArray.push(videoType);

    const thumbnail = (
      <img
        className="thumbnail"
        id={`sample-creation-entry-${row + 1}`}
        src={dataForCurrentClientEntry.thumbnailLink}
      ></img>
    );
    const thumbnailContainer = (
      <div className="sample-creation-entry-thumbnail-container">{thumbnail}</div>
    );
    sampleCreationEntryDataArray.push(thumbnailContainer);

    const settingsButtonIcon = (
      <img
        className="sample-creation-entry-action-icon rounded-circle"
        id={`sample-creation-entry-${row + 1}`}
        src="src/Images/settings.png"
      ></img>
    );
    const settingsButton = (
      <button
        className="sample-creation-entry-action-button btn rounded-circle sample-creation-settings-button"
        onClick={SettingsButtonClickProcessor}
      >
        {settingsButtonIcon}
      </button>
    );
    sampleCreationEntryDataArray.push(settingsButton);

    const organizeButtonIcon = (
      <img
        className="sample-creation-entry-action-icon rounded-circle"
        id={`sample-creation-entry-${row + 1}`}
        src="src/Images/organize.png"
      ></img>
    );
    const organizeButton = (
      <button
        className="sample-creation-entry-action-button btn rounded-circle sample-creation-organize-button"
        onClick={OrganizeButtonClickProcessor}
      >
        {organizeButtonIcon}
      </button>
    );
    sampleCreationEntryDataArray.push(organizeButton);

    const postProductionButtonIcon = (
      <img
        className="sample-creation-entry-action-icon rounded-circle"
        id={`sample-creation-entry-${row + 1}`}
        src="src/Images/postProduction.png"
      ></img>
    );
    const postProductionButton = (
      <button
        className="sample-creation-entry-action-button btn rounded-circle sample-creation-post-production-button"
        onClick={PostProductionButtonClickProcessor}
      >
        {postProductionButtonIcon}
      </button>
    );
    sampleCreationEntryDataArray.push(postProductionButton);

    const uploadButtonIcon = (
      <img
        className="sample-creation-entry-action-icon rounded-circle"
        id={`sample-creation-entry-${row + 1}`}
        src="src/Images/upload.png"
      ></img>
    );
    const uploadButton = (
      <button
        className="sample-creation-entry-action-button btn rounded-circle sample-creation-upload-button"
        onClick={UploadButtonClickProcessor}
      >
        {uploadButtonIcon}
      </button>
    );
    sampleCreationEntryDataArray.push(uploadButton);

    const deleteButtonIcon = (
      <img
        className="sample-creation-entry-action-icon rounded-circle"
        id={`sample-creation-entry-${row + 1}`}
        src="src/Images/delete.png"
      ></img>
    );
    const deleteButton = (
      <button
        className="sample-creation-entry-action-button btn rounded-circle sample-creation-delete-button"
        onClick={DeleteButtonClickProcessor}
      >
        {deleteButtonIcon}
      </button>
    );
    sampleCreationEntryDataArray.push(deleteButton);

    const sampleCreationEntryContainer = (
      <div className="sample-creation-entry border border-secondary rounded">
        {sampleCreationEntryDataArray}
      </div>
    );
    sampleCreationEntriesArray.push(sampleCreationEntryContainer);
  }

  const sampleCreationEntriesContainer = (
    <div className="sample-creation-entries">{sampleCreationEntriesArray}</div>
  );
  const sampleCreationEntriesAndHeaderContainer = (
    <div id="sample-creation-entries-and-header">
      {headerContainer}
      {sampleCreationEntriesContainer}
    </div>
  );

  return sampleCreationEntriesAndHeaderContainer;
}

export default SampleCreationEntriesAndHeader;
