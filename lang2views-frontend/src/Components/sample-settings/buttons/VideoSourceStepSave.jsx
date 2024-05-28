import "./save.css";

function handleSubmit() {
  const youtubeLinkInput = document.querySelector("#youtubeLink-input");
  const uploadFilepathInput = document.querySelector("#uploadFilepath-input");

  console.log(youtubeLinkInput.value + "\n");
  console.log(uploadFilepathInput.value + "\n");
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
