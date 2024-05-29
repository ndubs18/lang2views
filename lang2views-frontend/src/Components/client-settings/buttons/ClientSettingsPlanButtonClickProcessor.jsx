import { createRoot } from "react-dom/client";
import Plan from "./Plan";
import "../../Utilities/popup.css";

function ClientSettingsPlanButtonClickProcessor() {
    const popupsMenusStepAArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsPlanButtonRoot = createRoot(popupsMenusStepAArea);

    clientSettingsPlanButtonRoot.render(<Plan />);
}

export default ClientSettingsPlanButtonClickProcessor;