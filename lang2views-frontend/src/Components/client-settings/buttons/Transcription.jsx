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

function Transcription() {
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
