import React from "react";
import "./clientEntriesAndHeader.css";
import ClientVideoListProcessor from "./ClientVideoListProcessor";
import ClientPlanButtonClickProcessor from "./ClientPlanButtonClickProcessor";
import ClientSettingsButtonClickProcessor from "./ClientSettingsButtonClickProcessor";
import ClientDeleteButtonClickProcessor from "./ClientDeleteButtonClickProcessor";

function ClientEntriesAndHeader(props) {
  const typeOfClientData = [
    "client-photo-client-entry-data",
    "name-client-entry-data",
    "long-format-client-entry-data",
    "shorts-client-entry-data",
    "percentage-done-client-entry-data",
    "settings-button-client-entry-data",
    "plan-button-client-entry-data",
    "video-list-button-client-entry-data",
    "delete-button-client-entry-data",
  ];

  if (props === null)
    throw new Error("props is null for function ClientEntriesAndHeader");

  if (!props.hasOwnProperty("headerData"))
    throw new Error("No value was passed for headerData");

  if (!props.hasOwnProperty("clientEntries"))
    throw new Error("No value was passed for clientEntries");

  if (!Array.isArray(props.headerData))
    throw new Error("headerData is not an array");

  if (!Array.isArray(props.clientEntries))
    throw new Error("clientEntries is not an array");

  const headerDataArray = [];
  const headerData = props.headerData;
  for (let col = 0; col < headerData.length; col++) {
    const typeOfClientDataContainer = (
      <div
        className={
          typeOfClientData[col] +
          " client-entry-and-header-individual-pieces-of-data-divs text-secondary"
        }
      >
        {headerData[col]}
      </div>
    );
    headerDataArray.push(typeOfClientDataContainer);
  }

  const headerContainer = (
    <div className="clients-table-header">{headerDataArray}</div>
  );

  const clientEntriesArray = [];
  for (let row = 0; row < props.clientEntries.length; row++) {
    const clientEntryDataArray = [];
    const dataForCurrentClientEntry = props.clientEntries[row];

    const accountPicture = (
      <img
        className="client-photo-client-entry-data rounded-circle"
        id={`client-${row + 1}`}
        src={dataForCurrentClientEntry.clientYoutubePictureLink}
      ></img>
    );
    const accountPictureContainer = (
      <div className="client-photo-container">{accountPicture}</div>
    );

    clientEntryDataArray.push(accountPictureContainer);

    const clientName = (
      <div
        className={
          typeOfClientData[1] +
          " client-entry-and-header-individual-pieces-of-data-divs"
        }
      >
        {dataForCurrentClientEntry.clientName}
      </div>
    );
    clientEntryDataArray.push(clientName);

    const numLongFormatVideosDone = (
      <div
        className={
          typeOfClientData[2] +
          " client-entry-and-header-individual-pieces-of-data-divs"
        }
      >
        {dataForCurrentClientEntry.numLongFormatVideosDone}
      </div>
    );
    clientEntryDataArray.push(numLongFormatVideosDone);

    const numShortsDone = (
      <div
        className={
          typeOfClientData[3] +
          " client-entry-and-header-individual-pieces-of-data-divs"
        }
      >
        {dataForCurrentClientEntry.numShortsDone}
      </div>
    );
    clientEntryDataArray.push(numShortsDone);

    const percentageDone = (
      <div
        className={
          typeOfClientData[4] +
          " client-entry-and-header-individual-pieces-of-data-divs"
        }
      >
        {dataForCurrentClientEntry.percentageDone}%
      </div>
    );
    clientEntryDataArray.push(percentageDone);

    const settingsButtonIcon = (
      <img
        className="client-entry-action-icon rounded-circle"
        id={`client-${row + 1}`}
        src="src/Images/settings.png"
      ></img>
    );
    const settingsButton = (
      <button
        className="client-entry-action-button btn rounded-circle client-entry-settings-button"
        onClick={ClientSettingsButtonClickProcessor}
      >
        {settingsButtonIcon}
      </button>
    );
    clientEntryDataArray.push(settingsButton);

    const planButtonIcon = (
      <img
        className="client-entry-action-icon rounded-circle"
        id={`client-${row + 1}`}
        src="src/Images/plan.png"
      ></img>
    );
    const planButton = (
      <button
        className="client-entry-action-button btn rounded-circle client-entry-plan-button"
        onClick={ClientPlanButtonClickProcessor}
      >
        {planButtonIcon}
      </button>
    );
    clientEntryDataArray.push(planButton);

    const videoListButtonIcon = (
      <img
        className="client-entry-action-icon rounded-circle"
        id={`client-${row + 1}`}
        src="src/Images/video list.png"
      ></img>
    );
    const videoListButton = (
      <button
        className="client-entry-action-button btn rounded-circle client-entry-video-list-button"
        onClick={ClientVideoListProcessor}
      >
        {videoListButtonIcon}
      </button>
    );
    clientEntryDataArray.push(videoListButton);

    const deleteButtonIcon = (
      <img
        className="client-entry-action-icon rounded-circle"
        id={`client-${row + 1}`}
        src="src/Images/delete.png"
      ></img>
    );
    const deleteButton = (
      <button
        className="client-entry-action-button btn rounded-circle client-entry-delete-button"
        onClick={ClientDeleteButtonClickProcessor}
      >
        {deleteButtonIcon}
      </button>
    );
    clientEntryDataArray.push(deleteButton);

    const clientIdContainer = (
      <div hidden={true}>{dataForCurrentClientEntry.clientId}</div>
    );
    clientEntryDataArray.push(clientIdContainer);

    const clientEntryContainer = (
      <div className="client-entry border border-secondary rounded">
        {clientEntryDataArray}
      </div>
    );
    clientEntriesArray.push(clientEntryContainer);
  }

  const clientEntriesContainer = (
    <div className="client-entries">{clientEntriesArray}</div>
  );
  const clientEntriesAndHeaderContainer = (
    <div id="client-entries-and-header">
      {headerContainer}
      {clientEntriesContainer}
    </div>
  );

  return clientEntriesAndHeaderContainer;
}

export default ClientEntriesAndHeader;
