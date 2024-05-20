import React, { useState } from "react";
import SampleCreationView from "../Sample-creation/SampleCreationView";
import { createRoot } from "react-dom/client";

function renderSampleCreationView() {
    const viewContainer = document.querySelector("#view-container");

    const sampleCreationViewButton = document.querySelector("#sample-creation-view-button");
    sampleCreationViewButton.classList.add("bg-primary");

    const clientsViewButton = document.querySelector("#clients-view-button");

    if (clientsViewButton.classList.contains("bg-primary"))
        clientsViewButton.classList.remove("bg-primary");

    if (viewContainer === null)
        throw new Error("Cannot display the sample creation view if the view container is null, the sample creation view is supposed to be rendered on the same page");

    let viewContainerHook = null;

    viewContainerHook = createRoot(viewContainer);

    const accountNameContainer = document.querySelector("#account-name");

    viewContainerHook.render(<SampleCreationView currentUser={"Alexander"}/>);
}

function SampleCreationViewButton() {
    const sampleCreationViewLogo = <img id="sample-creation-view-button-icon" src="src/Images/"></img>;

    return <button onClick={renderSampleCreationView} className="btn" id="sample-creation-view-button">{sampleCreationViewLogo}</button>;
}

export default SampleCreationViewButton;