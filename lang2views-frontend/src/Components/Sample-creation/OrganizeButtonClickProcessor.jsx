import { createRoot } from "react-dom/client";
import Organize from "../Organize/Organize";
import React from "react";

function SampleSettingsButtonClickProcessor(props) {
    if (props === null)
        throw new Error("props for function OrganizeButtonClickProcessor is null");

    const popupAndCloseAreaContainer = document.querySelector(".popup-and-close-area-container");

    const clientsViewHook = createRoot(popupAndCloseAreaContainer);
    
    clientsViewHook.render(<Organize channelName={props.channelName} />);
}

export default SampleSettingsButtonClickProcessor;