import "./Panel.css";
import Panel from "./Panel"
import { useState } from "react";
import { useGlobalContext } from "../../Context/globalContext";

function PostProductionPanel({ channelId, channelName, video }) {
    const [postProductionData, setPostProductionData] = useState("");
    const { isPostProductionVisible, setIsPostProductionVisible } = useGlobalContext();
    let dropboxUrl = ""
    let videoName = ""

    const postProduceVideo = async () => {
        await fetch("http://localhost:3000/client/postProcess", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
                videoId: video.id,
            }),
        }).then((response) => {
            response
                .json()
                .then((value) => setPostProductionData(value))
                .catch((err) => {
                    throw new Error(err);
                })
        });
    }

    if (postProductionData) {
        dropboxUrl = postProductionData.dropboxUrl;
    }

    if (video) {
        videoName = video.name
    }

    if (!isPostProductionVisible) return null;
    function togglePostProductionModal() {
    if (isPostProductionVisible) {
            setIsPostProductionVisible(false);
        } else {
            setIsPostProductionVisible(true);
        }
    }

    const panelContent = (<>
        <div className="text-with-input-information">
            <p className="widget-text">Link To Project</p>
            <p className="widget-input">{dropboxUrl}</p>
            <button className="arrow-diagonal">↗</button>
        </div>
        <button onClick={postProduceVideo} className="panel-action-button">POST-PRODUCE</button>
        <button onClick={togglePostProductionModal} className="go-back-button">GO BACK</button>
    </>);

    return (
        <Panel channelName={channelName} videoName={videoName}>{panelContent}</Panel>
    );
}

export default PostProductionPanel;
