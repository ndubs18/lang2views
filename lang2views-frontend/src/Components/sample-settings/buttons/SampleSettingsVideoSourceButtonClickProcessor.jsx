import { createRoot } from "react-dom/client";
import VideoSource from "./VideoSource";

function SampleSettingsVideoSourceButtonClickProcessor() {
    const popupsMenusStepArea = document.querySelector(".popup-menus-step-area");
    const sampleSettingsVideoSourceButtonRoot = createRoot(popupsMenusStepArea);

    sampleSettingsVideoSourceButtonRoot.render(<VideoSource channelName="Alex" />);
}

export default SampleSettingsVideoSourceButtonClickProcessor;