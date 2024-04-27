import React from "react";
import "./sampleCreationEntriesAndHeader.css";
import clientVideoListProcessor from "../Clients/clientVideoListProcessor";
import ClientPlanButtonClickProcessor from "../Clients/ClientPlanButtonClickProcessor";
import ClientSettingsButtonClickProcessor from "../Clients/ClientSettingsButtonClickProcessor";
import ClientDeleteButtonClickProcessor from "../Clients/ClientDeleteButtonClickProcessor";

function SampleCreationEntriesAndHeader(props) {
    const typeOfClientData = ["client-photo-client-entry-data", "name-client-entry-data", "long-format-client-entry-data", "shorts-client-entry-data", "percentage-done-client-entry-data", "settings-button-client-entry-data", "plan-button-client-entry-data", "video-list-button-client-entry-data", "delete-button-client-entry-data"];

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
        const typeOfClientDataContainer = <div className={typeOfClientData[col] + " client-entry-and-header-individual-pieces-of-data-divs text-secondary"}>{headerData[col]}</div>;
        headerDataArray.push(typeOfClientDataContainer);
    }

    const headerContainer = <div className="header">{headerDataArray}</div>;

    const sampleCreationEntriesArray = [];
    for (let row = 0; row < props.sampleCreationEntries.length; row++) {
        const clientEntryDataArray = [];
        const dataForCurrentClientEntry = props.sampleCreationEntries[row];

        const accountPicture = <img className="client-photo-client-entry-data rounded-circle" id={`client-${row + 1}`} src="src/Images/brown.png"></img>;
        const accountPictureContainer = <div className="client-photo-container">{accountPicture}</div>;

        clientEntryDataArray.push(accountPictureContainer);

        for (let col = 1; col < dataForCurrentClientEntry.length - 4; col++) {
            const partOfAllOfClientEntryDataContainer = <div className={typeOfClientData[col] + " client-entry-and-header-individual-pieces-of-data-divs"}>{dataForCurrentClientEntry[col]}</div>;
            clientEntryDataArray.push(partOfAllOfClientEntryDataContainer);
        }
 
        const settingsButtonIcon = <img className="client-entry-action-icon rounded-circle" id={`client-${row + 1}`} src="src/Images/brown.png"></img>;
        const settingsButton = <button className="client-entry-action-button btn rounded-circle client-entry-settings-button" onClick={ClientSettingsButtonClickProcessor}>{settingsButtonIcon}</button>
        clientEntryDataArray.push(settingsButton);

        const planButtonIcon = <img className="client-entry-action-icon rounded-circle" id={`client-${row + 1}`} src="src/Images/brown.png"></img>;
        const planButton = <button className="client-entry-action-button btn rounded-circle client-entry-plan-button" onClick={ClientPlanButtonClickProcessor}>{planButtonIcon}</button>
        clientEntryDataArray.push(planButton);

        const videoListButtonIcon = <img className="client-entry-action-icon rounded-circle" id={`client-${row + 1}`} src="src/Images/brown.png"></img>;
        const videoListButton = <button className="client-entry-action-button btn rounded-circle client-entry-video-list-button" onClick={clientVideoListProcessor}>{videoListButtonIcon}</button>
        clientEntryDataArray.push(videoListButton);

        const deleteButtonIcon = <img className="client-entry-action-icon rounded-circle" id={`client-${row + 1}`} src="src/Images/brown.png"></img>;
        const deleteButton = <button className="client-entry-action-button btn rounded-circle client-entry-delete-button" onClick={ClientDeleteButtonClickProcessor}>{deleteButtonIcon}</button>
        clientEntryDataArray.push(deleteButton);

        const clientEntryContainer = <div className="client-entry border border-secondary rounded">{clientEntryDataArray}</div>;
        sampleCreationEntriesArray.push(clientEntryContainer);
    }
    
    const sampleCreationEntriesContainer = <div className="client-entries">{sampleCreationEntriesArray}</div>;
    const sampleCreationEntriesAndHeaderContainer = <div id="client-entries-and-header">{headerContainer}{sampleCreationEntriesContainer}</div>;

    return sampleCreationEntriesAndHeaderContainer;
}

export default SampleCreationEntriesAndHeader;