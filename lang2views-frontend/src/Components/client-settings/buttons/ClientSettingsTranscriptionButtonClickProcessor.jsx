import { createRoot } from "react-dom/client";
import "../../Utilities/popup.css";
import Transcription from "./Transcription";

function ClientSettingsTranscriptionButtonClickProcessor() {
    const popupsMenusStepAArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsPlanButtonRoot = createRoot(popupsMenusStepAArea);

    clientSettingsPlanButtonRoot.render(<Transcription channelName="Alex" />);
}

export default ClientSettingsTranscriptionButtonClickProcessor;