import "./save.css";

class TitleOrderOfPlacementPair {
  title = ""
  placement = 0
}

function sortOrderOfVideos(videos) {
  videos.sort((currentVideo, nextVideo) => {
      if (currentVideo.placement > nextVideo.placement)
          return 1;
      else if (currentVideo.placement < nextVideo.placement)
          return -1;
      else
          return 0;
  });
}

function handleSubmit() {
  const videoSelectButtons = document.querySelectorAll(".long-format-video-select-button");

  const videoProcessingList = [];

  for (let i = 0; i < videoSelectButtons.length; i++) {
    if (videoSelectButtons[i].textContent !== "") {
      const titleOrderOfPlacementPair = new TitleOrderOfPlacementPair();

      titleOrderOfPlacementPair.title = videoSelectButtons[i].id;
      titleOrderOfPlacementPair.placement = videoSelectButtons[i].textContent;

      videoProcessingList.push(titleOrderOfPlacementPair);
    }
  }

  sortOrderOfVideos(videoProcessingList);

  console.log(videoProcessingList);
}

function LongFormatStepSave() {
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

export default LongFormatStepSave;
