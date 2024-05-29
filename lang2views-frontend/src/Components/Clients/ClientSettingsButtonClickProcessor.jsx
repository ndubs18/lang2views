import { createRoot } from "react-dom/client";
import ClientSettings from "../client-settings/ClientSettings";
import React from "react";

function ClientSettingsButtonClickProcessor() {
  const popupAndCloseAreaContainer = document.querySelector(".popup-and-close-area-container");

  const clientsViewHook = createRoot(popupAndCloseAreaContainer);

  clientsViewHook.render(<ClientSettings />);
}

export default ClientSettingsButtonClickProcessor;
