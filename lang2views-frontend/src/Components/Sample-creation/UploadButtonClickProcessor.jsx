import { createRoot } from "react-dom/client";
import Upload from "../Upload/upload";
import React from "react";

function UploadButtonClickProcessor(props) {
    if (props === null)
        throw new Error("props for function UploadButtonClickProcessor is null");

    const popupAndCloseAreaContainer = document.querySelector(".popup-and-close-area-container");

    const clientsViewHook = createRoot(popupAndCloseAreaContainer);
    
    clientsViewHook.render(<Upload channelName={props.channelName} />);
}

export default UploadButtonClickProcessor;