import { createRoot } from "react-dom/client";
import "../Utilities/popup.css";
import LongFormatVideoList from "./LongFormatVideoList";

function ClientPlanLongFormatButtonClickProcessor() {
    const popupsMenusStepAArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsPlanButtonRoot = createRoot(popupsMenusStepAArea);

    clientSettingsPlanButtonRoot.render(<LongFormatVideoList />);
}

export default ClientPlanLongFormatButtonClickProcessor;