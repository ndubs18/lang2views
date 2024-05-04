import "./save.css";

function handleSubmit() {
  const modelInput = document.querySelector("#model-input");
  const dictionaryInput = document.querySelector("#dictionary-input");

  console.log(modelInput.value + "\n");
  console.log(dictionaryInput.value);
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
