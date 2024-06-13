import { createRoot } from "react-dom/client";
import Plan from "./Plan";

function ClientSettingsPlanButtonClickProcessor() {
    const popupsMenusStepArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsPlanButtonRoot = createRoot(popupsMenusStepArea);

    clientSettingsPlanButtonRoot.render(<Plan />);
}

export default ClientSettingsPlanButtonClickProcessor;