import { createRoot } from "react-dom/client";
import ClientSettings from "../client-settings/ClientSettings";
import React from "react";

function ClientSettingsButtonClickProcessor(props) {
    if (props === null)
        throw new Error("props for function ClientSettingsButtonClickProcessor is null");

    const popupAndCloseAreaContainer = document.querySelector(".popup-and-close-area-container");

    const clientsViewHook = createRoot(popupAndCloseAreaContainer);
    
    clientsViewHook.render(<ClientSettings channelName={props.channelName} />);
}

export default ClientSettingsButtonClickProcessor;