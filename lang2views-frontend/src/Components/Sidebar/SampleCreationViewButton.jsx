import React from "react";
import SampleCreationView from "../Sample-creation/SampleCreationView";
import { createRoot } from "react-dom/client";

function renderSampleCreationView() {
    const viewContainer = document.querySelector("#view-container");

    if (viewContainer === null)
        throw new Error("Cannot display the sample creation view if the view container is null, the sample creation view is supposed to be rendered on the same page");

    let viewContainerHook = null;

    viewContainerHook = createRoot(viewContainer);

    const accountNameContainer = document.querySelector("#account-name");

    viewContainerHook.render(<SampleCreationView currentUser={"Alexander"}/>);
}

function SampleCreationViewButton() {
    const sampleCreationViewLogo = <img id="sample-creation-view-button-icon" src="src/Images/brown.png"></img>;

    return <button onClick={renderSampleCreationView} className="btn bg-secondary" id="sample-creation-view-button">{sampleCreationViewLogo}</button>;
}

export default SampleCreationViewButton;