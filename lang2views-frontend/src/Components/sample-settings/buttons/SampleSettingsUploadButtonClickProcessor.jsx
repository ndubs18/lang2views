import { createRoot } from "react-dom/client";
import Upload from "./Upload";

function SampleSettingsUploadButtonClickProcessor() {
    const popupsMenusStepArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsUploadButtonRoot = createRoot(popupsMenusStepArea);

    clientSettingsUploadButtonRoot.render(<Upload channelName="Alex" />);
}

export default SampleSettingsUploadButtonClickProcessor;