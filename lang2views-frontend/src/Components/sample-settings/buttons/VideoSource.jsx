import "../sampleSettings.css";
import Save from "./VideoSourceStepSave";

function YoutubeLink() {
  return (
    <div className="text-input-container ms-5">
      <h2>Youtube Link</h2>
      <label htmlFor="youtubeLink-input"></label>
      <input className="form-control form-control-lg" id="youtubeLink-input"></input>
    </div>
  );
}

function VideoSource(props) {
  if (props === null)
    return new Error("props for Video Source in sample settings is null");

  if (props.channelName === null)
    return new Error(
      "No channelName for video source section of sampleSettings"
    );

  return (
    <div>
      <br />
      <YoutubeLink />
      <div className="horizontal-line"></div>
      <Save />
    </div>
  );
}

export default VideoSource;
