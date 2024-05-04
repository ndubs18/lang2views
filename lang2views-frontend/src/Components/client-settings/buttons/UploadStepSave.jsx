import "./save.css";

function handleSubmit() {
  const youtubeAccessSectionValue = document.querySelector(".grant-youtube-access-section-value");
  const useSameDescriptionSectionValue = document.querySelector(".use-same-description-section-value");
  const useSameTagsSectionValue = document.querySelector(".use-same-tags-section-value");
  const description = document.querySelector("#description-input");
  const tags = document.querySelector("#num-tags-input");

  console.log(youtubeAccessSectionValue.textContent);
  console.log(useSameDescriptionSectionValue.textContent);
  console.log(useSameTagsSectionValue.textContent);
  console.log(description.value);
  console.log(tags.value);
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
