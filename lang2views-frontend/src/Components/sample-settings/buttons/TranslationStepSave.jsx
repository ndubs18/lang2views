import "./save.css";

function handleSubmit() {
  const modelInput = document.querySelector("#model-input");
  const chatGPTInstructionsInput = document.querySelector("#ChatGPTInstructions-input");

  console.log(modelInput.value + "\n");
  console.log(chatGPTInstructionsInput.value);
}

function Save() {
  return (
    <button
      id="save"
      className="btn btn-primary"
      onClick={handleSubmit}
    >
      Save
    </button>
  );
}

export default Save;
