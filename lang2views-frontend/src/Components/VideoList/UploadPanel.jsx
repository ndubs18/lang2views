import "./Panel.css";
import Panel from "./Panel"
import { useState } from "react";
import { useGlobalContext } from "../../Context/globalContext";
import { alertError } from "../Utilities/Alert";

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
                .then((value) => { setUploadData(value); alertError(value.message) })
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
            <p className="widget-text">File to Upload:</p>
            <input type="file" name="uploadFile" accept="video/*" onChange={handleFileChange} />
        </div>
        <div className="text-with-input-information">
            <p className="widget-text">Link To Uploaded Video</p>
            <p className="widget-input">{youtubeUrl}</p>
            <button className="arrow-diagonal" onClick={() => window.open(youtubeUrl, '_blank')}>↗</button>
        </div>
        <button onClick={uploadVideo} className="btn btn-primary panel-action-button">UPLOAD</button>
        <button onClick={toggleUploadModal} className="btn btn-primary panel-action-button">GO BACK</button>
    </>)

    return (
        <Panel channelName={channelName} panelName="Upload" videoName={videoName}>{panelContent}</Panel>
  );
}

export default UploadPanel;
