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

function ChatGPTInstructions() {
    return (
      <div className="text-input-container w-100 ms-5 d-flex flex-column align-items-start">
        <h2>Chat GPT Instructions</h2>
        <label htmlFor="ChatGPTInstructions-input"></label>
        <textarea className="form-control form-control-lg text-area" id="ChatGPTInstructions-input"></textarea>
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
      <ChatGPTInstructions />
      <div className="horizontal-line"></div>
      <Save />
    </div>
  );
}

export default Translation;
