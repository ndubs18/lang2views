import { createRoot } from "react-dom/client";
import Transcription from "./Transcription";

function SampleSettingsTranscriptionButtonClickProcessor() {
    const popupsMenusStepArea = document.querySelector(".popup-menus-step-area");
    const sampleSettingsPlanButtonRoot = createRoot(popupsMenusStepArea);

    sampleSettingsPlanButtonRoot.render(<Transcription channelName="Alex" />);
}

export default SampleSettingsTranscriptionButtonClickProcessor;