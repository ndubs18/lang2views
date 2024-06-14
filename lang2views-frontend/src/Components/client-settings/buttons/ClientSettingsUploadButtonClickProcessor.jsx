import { createRoot } from "react-dom/client";
import Upload from "./Upload";

function ClientSettingsUploadButtonClickProcessor() {
    const popupsMenusStepArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsUploadButtonRoot = createRoot(popupsMenusStepArea);

    clientSettingsUploadButtonRoot.render(<Upload />);
}

export default ClientSettingsUploadButtonClickProcessor;