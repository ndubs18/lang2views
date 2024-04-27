import "../clientSettings.css";

function Transcription(props) {
    if (props === null)
        return new Error("props for Plan in client settings is null");

    if (props.channelName === null)
        return new Error("No channelName for transcription section of clientSettings");

    return <div><p>{props.channelName}</p><br /></div>;
}

export default Transcription;