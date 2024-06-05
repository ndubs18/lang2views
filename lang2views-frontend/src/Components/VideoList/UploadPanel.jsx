import "./Panel.css";
import Panel from "./Panel"
import { useState } from "react";
import { useGlobalContext } from "../../Context/globalContext";

function UploadPanel({ channelId, channelName, video }) {
    const [videoFile, setVideoFile] = useState();
    const [uploadData, setUploadData] = useState("");
    const { isUploadVisible, setIsUploadVisible } = useGlobalContext();
    let youtubeUrl = ""
    let videoName = ""

    if (video) {
        videoName = video.name;
    }

    if (uploadData) {
        youtubeUrl = uploadData.youtubeUrl;
    }

    const uploadVideo = async () => {
        const videoFormData = new FormData();
        videoFormData.append('file', videoFile);
        videoFormData.append('videoId', video.id)
        videoFormData.append('channelId', channelId)

        await fetch("http://localhost:3000/client/upload", {
            method: "POST",
            body: videoFormData
        }).then((response) => {
            response
                .json()
                .then((value) => setUploadData(value))
                .catch((err) => {
                    throw new Error(err);
                })
        });
    }

    function handleFileChange(event) {
        setVideoFile(event.target.files[0]);
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
            <p className="widget-text">Link To Uploaded Video</p>
            <p className="widget-input">{youtubeUrl}</p>
        <button className="arrow-diagonal">↗</button>
        </div>
        <div className="text-with-input-information">
            <input type="file" name="uploadFile" accept="video/*" onChange={handleFileChange} />
        </div>
        <button onClick={uploadVideo} className="panel-action-button">UPLOAD</button>
        <button onClick={toggleUploadModal} className="go-back-button">
            GO BACK
        </button>
    </>)

    return (
        <Panel channelName={channelName} videoName={videoName}>{panelContent}</Panel>
  );
}

export default UploadPanel;
