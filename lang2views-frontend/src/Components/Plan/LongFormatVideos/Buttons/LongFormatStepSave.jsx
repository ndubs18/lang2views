import "../../save.css";
import { longFormatVideosToProcessContext } from "../../../../Context/longFormatVideosToProcess";

class LongFormatVideo {
  title = "";
  placement = 0;
  thumbnailSrc = "";
}

function sortOrderOfVideos(videos) {
  videos.sort((currentVideo, nextVideo) => {
    if (currentVideo.placement > nextVideo.placement) return 1;
    else if (currentVideo.placement < nextVideo.placement) return -1;
    else return 0;
  });
}

function handleSubmit() {
  const currentVideosForProcessingContainer = document.querySelector(
    "#videos-for-processing-json"
  );

  let videoProcessingList = JSON.parse(currentVideosForProcessingContainer.textContent);

  const videoSelectButtonsWithDuplicates = document.querySelectorAll(
    ".long-format-video-select-button"
  );
  const videoSelectButtons = [];
  for (let i = 0; i < videoSelectButtonsWithDuplicates.length / 4; i++) {
    videoSelectButtons.push(videoSelectButtonsWithDuplicates[i]);
  }

  const videoThumbnailsWithDuplicates =
    document.querySelectorAll('[id$="thumbnail"]');
  const videoThumbnails = [];
  for (let i = 0; i < videoThumbnailsWithDuplicates.length / 4; i++) {
    videoThumbnails.push(videoThumbnailsWithDuplicates[i]);
  }

  for (let i = 0; i < videoSelectButtons.length; i++) {
    if (videoSelectButtons[i].textContent !== "") {
      if (
        videoProcessingList.find(
          (video) => video.title === videoSelectButtons[i].id
        ) === undefined
      ) {
        const longFormatVideo = new LongFormatVideo();

        longFormatVideo.title = videoSelectButtons[i].id;
        longFormatVideo.placement = Number.parseInt(videoSelectButtons[i].textContent);
        longFormatVideo.thumbnailSrc = videoThumbnails[i].textContent;

        videoProcessingList.push(longFormatVideo);
      }
    } else {
      const removedVideo = videoProcessingList.find(
        (video) => video.title === videoSelectButtons[i].id
      );
      
      if (removedVideo !== undefined) {
        videoProcessingList = videoProcessingList.filter(
          (video) => video.title !== videoSelectButtons[i].id
        );

        videoProcessingList.map((video) => {
          if (video.placement > removedVideo.placement)
            return (video.placement = video.placement - 1);
        });
      }
    }
  }

  sortOrderOfVideos(videoProcessingList);

  longFormatVideosToProcessContext.Provider = JSON.stringify(videoProcessingList);

  console.log(longFormatVideosToProcessContext.Provider);
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