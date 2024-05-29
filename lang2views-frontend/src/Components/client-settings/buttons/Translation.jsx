import "../clientSettings.css";
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

function Translation() {
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
