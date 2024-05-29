import { createRoot } from "react-dom/client";
import SampleSettings from "../sample-settings/SampleSettings";
import React from "react";

function SampleSettingsButtonClickProcessor(props) {
    if (props === null)
        throw new Error("props for function SampleSettingsButtonClickProcessor is null");

    const popupAndCloseAreaContainer = document.querySelector(".popup-and-close-area-container");

    const clientsViewHook = createRoot(popupAndCloseAreaContainer);
    
    clientsViewHook.render(<SampleSettings channelName={props.channelName} />);
}

export default SampleSettingsButtonClickProcessor;