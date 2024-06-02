import { createRoot } from "react-dom/client";
import "../Utilities/popup.css";
import LongFormatVideoList from "./LongFormatVideos/LongFormatVideoList";

function ClientPlanLongFormatButtonClickProcessor() {
    const popupsMenusStepArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsPlanButtonRoot = createRoot(popupsMenusStepArea);

    clientSettingsPlanButtonRoot.render(<LongFormatVideoList />);
}

export default ClientPlanLongFormatButtonClickProcessor;