import { createRoot } from "react-dom/client";
import "../Utilities/popup.css";
import LongFormatVideoList from "./LongFormatVideoList";

function ClientPlanLongFormatButtonClickProcessor(props) {
    const popupsMenusStepAArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsPlanButtonRoot = createRoot(popupsMenusStepAArea);

    clientSettingsPlanButtonRoot.render(<LongFormatVideoList channelName="Alex" clientId={props.clientId} />);
}

export default ClientPlanLongFormatButtonClickProcessor;