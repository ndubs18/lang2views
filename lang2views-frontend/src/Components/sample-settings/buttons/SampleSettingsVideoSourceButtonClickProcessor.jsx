import { createRoot } from "react-dom/client";
import "../../Utilities/popup.css";
import VideoSource from "./VideoSource";

function SampleSettingsVideoSourceButtonClickProcessor() {
    const popupsMenusStepArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsVideoSourceButtonRoot = createRoot(popupsMenusStepArea);

    clientSettingsVideoSourceButtonRoot.render(<VideoSource channelName="Alex" />);
}

export default SampleSettingsVideoSourceButtonClickProcessor;