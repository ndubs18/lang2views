import { createRoot } from "react-dom/client";
import PostProduction from "../PostProduction/postProduction";
import React from "react";

function PostProductionButtonClickProcessor(props) {
    if (props === null)
        throw new Error("props for function PostProductionButtonClickProcessor is null");

    const popupAndCloseAreaContainer = document.querySelector(".popup-and-close-area-container");

    const clientsViewHook = createRoot(popupAndCloseAreaContainer);
    
    clientsViewHook.render(<PostProduction channelName={props.channelName} />);
}

export default PostProductionButtonClickProcessor;