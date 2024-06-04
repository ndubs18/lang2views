import "./Panel.css";
import Panel from "./Panel"
import { useState } from "react";
import { useGlobalContext } from "../../Context/globalContext";

function OrganizePanel({ channelId, channelName, video }) {
    const [organizeData, setOrganizeData] = useState("");
    const { isOrganizeVisible, setIsOrganizeVisible } = useGlobalContext();
    let dropboxUrl = ""
    let scriptUrl = ""
    let trelloUrl = ""
    let videoName = ""

    const organizeVideo = async () => {
        fetch("http://localhost:3000/client/organizeVideo", {
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
                .then((value) => { setOrganizeData(value); console.log(organizeData) })
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
            <button className="arrow-diagonal">↗</button>
        </div>
        <div className="text-with-input-information">
            <p className="widget-text">Script Link</p>
            <p className="widget-input">{scriptUrl}</p>
            <button className="arrow-diagonal">↗</button>
        </div>
        <div className="text-with-input-information">
            <p className="widget-text">Trello Ticket</p>
            <p className="widget-input">{trelloUrl}</p>
            <button className="arrow-diagonal">↗</button>
        </div>
        <button onClick={organizeVideo} className="panel-action-button">ORGANIZE</button>
        <button onClick={toggleOrganizeModal} className="go-back-button">GO BACK</button>
    </>);

    return (
        <Panel channelName={channelName} videoName={videoName}>{panelContent}</Panel>
    );
}

export default OrganizePanel;
