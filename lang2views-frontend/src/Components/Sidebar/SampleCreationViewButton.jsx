import React, { useState } from "react";
import SampleCreationView from "../Sample-creation/SampleCreationView";
import { createRoot } from "react-dom/client";

function renderSampleCreationView() {
    const viewContainer = document.querySelector("#view-container");

    const sampleCreationViewIcon = document.querySelector(
    "#sample-creation-view-button-icon"
    );

    sampleCreationViewIcon.src = "src/Images/sampleActive.png";

    const clientsViewIcon = document.querySelector("#clients-view-button-icon");
    clientsViewIcon.src = "src/Images/client.png";

    if (viewContainer === null)
        throw new Error("Cannot display the sample creation view if the view container is null, the sample creation view is supposed to be rendered on the same page");

    let viewContainerHook = null;

    viewContainerHook = createRoot(viewContainer);

    const accountNameContainer = document.querySelector("#account-name");

    viewContainerHook.render(<SampleCreationView currentUser={"Alexander"}/>);
}

function SampleCreationViewButton() {
    const sampleCreationViewLogo = <img id="sample-creation-view-button-icon" src="src/Images/sample.png"></img>;

    return <button onClick={renderSampleCreationView} className="btn buttonInactive" id="sample-creation-view-button">{sampleCreationViewLogo}</button>;
}

export default SampleCreationViewButton;