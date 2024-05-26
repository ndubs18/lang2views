import "./postProductionStep.css";
function handleSubmit() {
  const projectLinkInput = document.querySelector("#projectLink-input");

  console.log(projectLinkInput.value + "\n");
}

function PostProductionButton() {
  return (
    <button
      id="postProduce"
      className="btn btn-primary"
      onClick={handleSubmit}
    >
      Post-Produce
    </button>
  );
}

export default PostProductionButton;
