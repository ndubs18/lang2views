import { createRoot } from "react-dom/client";
import ClientSettings from "../client-settings/ClientSettings";

function ClientSettingsButtonClickProcessor(channelId, channelName) {
  const popupAndCloseAreaContainer = document.querySelector(".popup-and-close-area-container");

  const clientsViewHook = createRoot(popupAndCloseAreaContainer);

    clientsViewHook.render(<ClientSettings channelId={channelId} channelName={channelName} />);
}

export default ClientSettingsButtonClickProcessor;
