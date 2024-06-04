import { createRoot } from "react-dom/client";
import "../../Utilities/popup.css";
import Transcription from "./Transcription";

function ClientSettingsTranscriptionButtonClickProcessor() {
    const popupsMenusStepArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsPlanButtonRoot = createRoot(popupsMenusStepArea);

    clientSettingsPlanButtonRoot.render(<Transcription />);
}

export default ClientSettingsTranscriptionButtonClickProcessor;