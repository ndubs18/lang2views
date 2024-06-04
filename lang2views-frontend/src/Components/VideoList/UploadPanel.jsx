import "./Panel.css";
import Panel from "./Panel"
import { useState } from "react";
import { useGlobalContext } from "../../Context/globalContext";

function UploadPanel({ channelId, channelName, video }) {
    const [youtubeLink, setYoutubeLink] = useState("");
    const { isUploadVisible, setIsUploadVisible } = useGlobalContext();
    let videoName = ""
    if (video) {
        videoName = video.name;
    }

    if (!isUploadVisible) return null;
    function toggleUploadModal() {
        if (isUploadVisible) {
            setIsUploadVisible(false);
        } else {
            setIsUploadVisible(true);
        }
    }

    const panelContent = (<>
        <div className="text-with-input-information">
            <p className="widget-text">YouTube Link</p>
            <input
                className="widget-input"
                type="text"
                placeholder={youtubeLink}
                value={youtubeLink}
                readOnly />
        <button className="arrow-diagonal">↗</button>
        </div>
        <button className="panel-action-button">UPLOAD</button>
        <button onClick={toggleUploadModal} className="go-back-button">
            GO BACK
        </button>
    </>)

    return (
        <Panel channelName={channelName} videoName={videoName}>{panelContent}</Panel>
  );
}

export default UploadPanel;
