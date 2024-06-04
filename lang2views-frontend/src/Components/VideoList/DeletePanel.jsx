import "./Panel.css";
import Panel from "./Panel"
import { useGlobalContext } from "../../Context/globalContext";

function DeletePanel({ channelId, channelName, video }) {
    const { isDeleteVisible, setIsDeleteVisible } = useGlobalContext();
    let videoName = ""

    const deleteVideo = async () => {
        fetch("http://localhost:3000/client/removeVideo", {
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
                .then((value) => console.log(value))
                .catch((err) => {
                    throw new Error(err);
                })
        });
    }

    if (video) {
        videoName = video.name
    }

    if (!isDeleteVisible) return null;
    function toggleDeleteModal() {
        if (isDeleteVisible) {
            setIsDeleteVisible(false);
        } else {
            setIsDeleteVisible(true);
        }
    }

    const panelContent = (<>
        <p className="widget-text" style={{ width: "100%" }}>This will fully remove the video from the server. Are you sure you want to delete it?</p>
        <button onClick={deleteVideo} className="panel-action-button">DELETE</button>
        <button onClick={toggleDeleteModal} className="go-back-button">GO BACK</button>
    </>);

    return (
        <Panel channelName={channelName} videoName={videoName}>{panelContent}</Panel>
    );
}

export default DeletePanel;
