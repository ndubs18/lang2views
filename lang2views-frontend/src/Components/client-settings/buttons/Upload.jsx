import "../clientSettings.css";
import Save from "./Save";

function Upload(props) {
    if (props === null)
        return new Error("props for Plan in client settings is null");

    if (props.channelName === null)
        return new Error("No channelName for upload section of clientSettings");

    return <div><br /><p>{props.channelName}</p><br /><Save component="client-settings-upload"/></div>;
}

export default Upload;