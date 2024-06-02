import { createRoot } from "react-dom/client";
import "../Utilities/popup.css";
import ShortsList from "./Shorts/ShortsList";

function ClientPlanShortsButtonClickProcessor() {
    const popupsMenusStepArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsPlanButtonRoot = createRoot(popupsMenusStepArea);

    clientSettingsPlanButtonRoot.render(<ShortsList />);
}

export default ClientPlanShortsButtonClickProcessor;