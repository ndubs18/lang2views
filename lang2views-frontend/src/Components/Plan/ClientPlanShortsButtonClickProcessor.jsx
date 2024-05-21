import { createRoot } from "react-dom/client";
import "../Utilities/popup.css";
import ShortsList from "./ShortsList";

function ClientPlanShortsButtonClickProcessor(props) {
    const popupsMenusStepAArea = document.querySelector(".popup-menus-step-area");
    const clientSettingsPlanButtonRoot = createRoot(popupsMenusStepAArea);

    clientSettingsPlanButtonRoot.render(<ShortsList channelName="Alex" clientId={props.clientId}/>);
}

export default ClientPlanShortsButtonClickProcessor;