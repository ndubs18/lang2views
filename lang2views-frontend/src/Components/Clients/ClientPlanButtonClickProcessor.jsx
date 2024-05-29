import ClientPlan from "../Plan/ClientPlan";
import { createRoot } from "react-dom/client";
import React from "react";

function ClientPlanButtonClickProcessor() {
    const popupAndCloseAreaContainer = document.querySelector(".popup-and-close-area-container");

    const clientsViewHook = createRoot(popupAndCloseAreaContainer);

    clientsViewHook.render(<ClientPlan />);
}

export default ClientPlanButtonClickProcessor;