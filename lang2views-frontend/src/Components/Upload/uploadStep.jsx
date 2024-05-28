import "./uploadStep.css";
function handleSubmit() {
  const projectLinkInput = document.querySelector("#youtubeLink-input");

  console.log(projectLinkInput.value + "\n");
}

function UploadButton() {
  return (
    <button
      id="upload"
      className="btn btn-primary"
      onClick={handleSubmit}
    >
      Upload
    </button>
  );
}

export default UploadButton;
