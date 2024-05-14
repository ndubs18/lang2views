import ClientPlan from "../Plan/ClientPlan";
import { createRoot } from "react-dom/client";
import React from "react";

function ClientPlanButtonClickProcessor(props) {
    if (props === null)
        throw new Error("props for function ClientPlanButtonClickProcessor is null");

    const popupAndCloseAreaContainer = document.querySelector(".popup-and-close-area-container");

    const clientsViewHook = createRoot(popupAndCloseAreaContainer);
    
    clientsViewHook.render(<ClientPlan channelName={props.channelName} />);
}

export default ClientPlanButtonClickProcessor;