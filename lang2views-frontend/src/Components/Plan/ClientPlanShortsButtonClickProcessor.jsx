import { createRoot } from "react-dom/client";
import "../Utilities/popup.css";
import ShortsList from "./ShortsList";

function ClientPlanShortsButtonClickProcessor() {
    const popupsMenusStepAArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsPlanButtonRoot = createRoot(popupsMenusStepAArea);

    clientSettingsPlanButtonRoot.render(<ShortsList channelName="Alex" />);
}

export default ClientPlanShortsButtonClickProcessor;