import ClientPlan from "../Plan/ClientPlan";
import { createRoot } from "react-dom/client";

function ClientPlanButtonClickProcessor(channelId, channelName) {
    const popupAndCloseAreaContainer = document.querySelector(".popup-and-close-area-container");

    const clientsViewHook = createRoot(popupAndCloseAreaContainer);

    clientsViewHook.render(<ClientPlan channelId={channelId} channelName={channelName} />);
}

export default ClientPlanButtonClickProcessor;