import React from "react";
import "./clientEntriesAndHeader.css";
import clientVideoListProcessor from "./clientVideoListProcessor";
import clientPlanProcessor from "./clientPlanProcessor";
import clientVideoSettingsProcessor from "./clientVideoSettingsProcessor";
import clientDeleteProcessor from "./clientDeleteProcessor";

function ClientEntriesAndHeader(props) {
    const typeOfClientData = ["client-photo-client-entry-data", "name-client-entry-data", "long-format-client-entry-data", "shorts-client-entry-data", "percentage-done-client-entry-data", "settings-button-client-entry-data", "plan-button-client-entry-data", "video-list-button-client-entry-data", "delete-button-client-entry-data"];

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
        const typeOfClientDataContainer = <div className={typeOfClientData[col] + " client-entry-and-header-individual-pieces-of-data-divs text-secondary"}>{headerData[col]}</div>;
        headerDataArray.push(typeOfClientDataContainer);
    }

    const headerContainer = <div className="header">{headerDataArray}</div>;

    const clientEntriesArray = [];
    for (let row = 0; row < props.clientEntries.length; row++) {
        const clientEntryDataArray = [];
        const dataForCurrentClientEntry = props.clientEntries[row];

        const accountPicture = <img className="client-photo-client-entry-data rounded-circle" id={`client-${row + 1}`} src="src/Images/brown.png"></img>;
        const accountPictureContainer = <div className="client-photo-container">{accountPicture}</div>;

        clientEntryDataArray.push(accountPictureContainer);

        for (let col = 1; col < dataForCurrentClientEntry.length - 4; col++) {
            const partOfAllOfClientEntryDataContainer = <div className={typeOfClientData[col] + " client-entry-and-header-individual-pieces-of-data-divs"}>{dataForCurrentClientEntry[col]}</div>;
            clientEntryDataArray.push(partOfAllOfClientEntryDataContainer);
        }
 
        const settingsButtonicon = <img className="client-entry-action-icon rounded-circle" id={`client-${row + 1}`} src="src/Images/brown.png"></img>;
        const settingsButton = <button className="client-entry-action-button btn rounded-circle client-entry-settings-button" onClick={clientVideoSettingsProcessor}>{settingsButtonicon}</button>
        clientEntryDataArray.push(settingsButton);

        const planButtonicon = <img className="client-entry-action-icon rounded-circle" id={`client-${row + 1}`} src="src/Images/brown.png"></img>;
        const planButton = <button className="client-entry-action-button btn rounded-circle client-entry-plan-button" onClick={clientPlanProcessor}>{planButtonicon}</button>
        clientEntryDataArray.push(planButton);

        const videoListButtonicon = <img className="client-entry-action-icon rounded-circle" id={`client-${row + 1}`} src="src/Images/brown.png"></img>;
        const videoListButton = <button className="client-entry-action-button btn rounded-circle client-entry-video-list-button" onClick={clientVideoListProcessor}>{videoListButtonicon}</button>
        clientEntryDataArray.push(videoListButton);

        const deleteButtonicon = <img className="client-entry-action-icon rounded-circle" id={`client-${row + 1}`} src="src/Images/brown.png"></img>;
        const deleteButton = <button className="client-entry-action-button btn rounded-circle client-entry-delete-button" onClick={clientDeleteProcessor}>{deleteButtonicon}</button>
        clientEntryDataArray.push(deleteButton);

        const clientEntryContainer = <div className="client-entry border border-secondary rounded">{clientEntryDataArray}</div>;
        clientEntriesArray.push(clientEntryContainer);
    }
    
    const clientEntriesContainer = <div className="client-entries">{clientEntriesArray}</div>;
    const clientEntriesAndHeaderContainer = <div id="client-entries-and-header">{headerContainer}{clientEntriesContainer}</div>;

    return clientEntriesAndHeaderContainer;
}

export default ClientEntriesAndHeader;