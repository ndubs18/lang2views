import { createRoot } from "react-dom/client";

function CloseSampleSettingsPopup() {
    const popupAndCloseContainer = document.querySelector(".popup-and-close-area-container");
    const popupAndCloseContainerRoot = createRoot(popupAndCloseContainer);

    popupAndCloseContainerRoot.render(null);
}

export default CloseSampleSettingsPopup;