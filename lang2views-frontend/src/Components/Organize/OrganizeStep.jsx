import "./OrganizeStep.css";
function handleSubmit() {
  const dropboxLocationInput = document.querySelector("#dropboxLocation-input");
  const scriptLinkInput = document.querySelector("#scriptLink-input");
  const trelloLinkInput = document.querySelector("#trelloLink-input");

  console.log(dropboxLocationInput.value + "\n");
  console.log(scriptLinkInput.value + "\n");
  console.log(trelloLinkInput.value + "\n");
}

function OrganizeButton() {
  return (
    <button
      id="organize"
      className="btn btn-primary"
      onClick={handleSubmit}
    >
      Organize
    </button>
  );
}

export default OrganizeButton;
