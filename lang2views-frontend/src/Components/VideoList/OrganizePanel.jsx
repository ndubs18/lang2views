import "./Panel.css";
import Panel from "./Panel"
import { useState } from "react";
import { useGlobalContext } from "../../Context/globalContext";
import { alertError } from "../Utilities/Alert";

function OrganizePanel({ channelId, channelName, video }) {
    const [organizeData, setOrganizeData] = useState("");
    const { isOrganizeVisible, setIsOrganizeVisible } = useGlobalContext();
    let dropboxUrl = ""
    let scriptUrl = ""
    let trelloUrl = ""
    let videoName = ""

    const organizeVideo = async () => {
        await fetch("http://localhost:3000/client/organizeVideo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
                videoId: video.id,
                lang: "es",
            }),
        }).then((response) => {
            response
                .json()
                .then((value) => { setOrganizeData(value); alertError(value.message)})
                .catch((err) => {
                    throw new Error(err);
                })
        });
    }

    if (organizeData) {
        dropboxUrl = organizeData.dropboxUrl;
        scriptUrl = organizeData.scriptUrl;
        trelloUrl = organizeData.trelloUrl;
    }

    if (video) {
        videoName = video.name
    }

  if (!isOrganizeVisible) return null;
  function toggleOrganizeModal() {
    if (isOrganizeVisible) {
      setIsOrganizeVisible(false);
    } else {
      setIsOrganizeVisible(true);
    }
    }

    const panelContent = (<>
        <div className="text-with-input-information">
            <p className="widget-text">Dropbox Location</p>
            <p className="widget-input">{dropboxUrl}</p>
            <button className="arrow-diagonal" onClick={() => window.open(dropboxUrl, '_blank')}>↗</button>
        </div>
        <div className="text-with-input-information">
            <p className="widget-text">Script Link</p>
            <p className="widget-input">{scriptUrl}</p>
            <button className="arrow-diagonal" onClick={() => window.open(scriptUrl, '_blank')}>↗</button>
        </div>
        <div className="text-with-input-information">
            <p className="widget-text">Trello Ticket</p>
            <p className="widget-input">{trelloUrl}</p>
            <button className="arrow-diagonal" onClick={() => window.open(trelloUrl, '_blank')}>↗</button>
        </div>
        <button onClick={organizeVideo} className="btn btn-primary panel-action-button">ORGANIZE</button>
        <button onClick={toggleOrganizeModal} className="btn btn-primary panel-action-button">GO BACK</button>
    </>);

    return (
        <Panel channelName={channelName} panelName="Organize" videoName={videoName}>{panelContent}</Panel>
    );
}

export default OrganizePanel;
