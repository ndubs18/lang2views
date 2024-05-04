import "../clientSettings.css";
import Save from "./TranscriptionStepSave";

function Model() {
  return (
    <div className="text-input-container ms-5">
      <h2>Model</h2>
      <label htmlFor="model-input"></label>
      <input className="form-control form-control-lg" id="model-input"></input>
    </div>
  );
}

function Transcription(props) {
  if (props === null)
    return new Error("props for Plan in client settings is null");

  if (props.channelName === null)
    return new Error(
      "No channelName for transcription section of clientSettings"
    );

  return (
    <div>
      <br />
      <Model />
      <div className="horizontal-line"></div>
      <Save />
    </div>
  );
}

export default Transcription;
