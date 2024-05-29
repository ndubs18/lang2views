import "./save.css";

function handleSubmit() {
  const modelInput = document.querySelector("#model-input");

  console.log(modelInput.value);
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
