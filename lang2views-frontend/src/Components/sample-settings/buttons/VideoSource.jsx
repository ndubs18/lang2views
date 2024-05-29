import "../sampleSettings.css";
import Save from "./VideoSourceStepSave";

function YoutubeLink() {
  return (
    <div className="ms-5 side-by-side">
      <h2>Youtube Link</h2>
      <label htmlFor="youtubeLink-input"></label>
      <input className="form-control form-control-lg" id="youtubeLink-input"></input>
    </div>
  );
}
function UploadFile() {
  return (
    <div className="ms-5 side-by-side">
      <h2>Upload</h2>
      <label htmlFor="UploadFile-input"></label>
      <input className="form-control form-control-lg" id="UploadFile-input" type="file"></input>
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
      <br />
      <UploadFile />
      <div className="horizontal-line"></div>
      <Save />
    </div>
  );
}

export default VideoSource;
