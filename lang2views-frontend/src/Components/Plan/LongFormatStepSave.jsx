import "./save.css";

class LongFormatVideo {
  title = ""
  placement = 0
  thumbnailSrc = ""
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

  const videoThumbnails = document.querySelectorAll('[id$="thumbnail"]');

  for (let i = 0; i < videoSelectButtons.length; i++) {
    if (videoSelectButtons[i].textContent !== "") {
      const longFormatVideo = new LongFormatVideo();

      longFormatVideo.title = videoSelectButtons[i].id;
      longFormatVideo.placement = videoSelectButtons[i].textContent;
      longFormatVideo.thumbnailSrc = videoThumbnails[i].textContent;

      videoProcessingList.push(longFormatVideo);
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
