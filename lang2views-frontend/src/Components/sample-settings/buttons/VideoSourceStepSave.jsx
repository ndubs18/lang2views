import "./save.css";

function handleSubmit() {
  const youtubeLinkInput = document.querySelector("#youtubeLink-input");

  console.log(youtubeLinkInput.value + "\n");
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
