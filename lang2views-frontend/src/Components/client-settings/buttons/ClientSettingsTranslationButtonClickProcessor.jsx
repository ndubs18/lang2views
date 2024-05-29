import { createRoot } from "react-dom/client";
import "../../Utilities/popup.css";
import Translation from "./Translation";

function ClientSettingsTranslationButtonClickProcessor() {
    const popupsMenusStepArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsTranslationButtonRoot = createRoot(popupsMenusStepArea);

    clientSettingsTranslationButtonRoot.render(<Translation />);
}

export default ClientSettingsTranslationButtonClickProcessor;