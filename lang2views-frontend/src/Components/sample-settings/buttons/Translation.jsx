import "../sampleSettings.css";
import Save from "./TranslationStepSave";

function Model() {
  return (
    <div className="text-input-container w-50 ms-5">
      <h2>Model</h2>
      <label htmlFor="model-input"></label>
      <input className="form-control form-control-lg" id="model-input"></input>
    </div>
  );
}

function Dictionary() {
    return (
      <div className="text-input-container w-100 ms-5 d-flex flex-column align-items-start">
        <h2>Dictionary</h2>
        <label htmlFor="dictionary-input"></label>
        <textarea className="form-control form-control-lg text-area" id="dictionary-input"></textarea>
      </div>
    );
  }

function Translation(props) {
  if (props === null)
    return new Error("props for Video Source in sample settings is null");

  if (props.channelName === null)
    return new Error(
      "No channelName for translation section of sampleSettings"
    );

  return (
    <div>
      <br />
      <Model />
      <Dictionary />
      <div className="horizontal-line"></div>
      <Save />
    </div>
  );
}

export default Translation;
