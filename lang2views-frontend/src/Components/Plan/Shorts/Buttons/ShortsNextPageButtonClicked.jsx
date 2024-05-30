class Short {
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

function handleNextPageButtonClicked() {
  const currentVideosForProcessingContainer = document.querySelector(
    "#videos-for-processing-json"
  );
  const currentVideosForProcessing = JSON.parse(
    currentVideosForProcessingContainer.textContent
  );

  let videoProcessingList = currentVideosForProcessing;

  const videoSelectButtonsWithDuplicates = document.querySelectorAll(
    ".short-select-button"
  );
  const videoSelectButtons = [];
  for (let i = 0; i < videoSelectButtonsWithDuplicates.length / 2; i++) {
    videoSelectButtons.push(videoSelectButtonsWithDuplicates[i]);
  }

  const videoThumbnailsWithDuplicates =
    document.querySelectorAll('[id$="thumbnail"]');
  const videoThumbnails = [];
  for (let i = 0; i < videoThumbnailsWithDuplicates.length / 2; i++) {
    videoThumbnails.push(videoThumbnailsWithDuplicates[i]);
  }

  for (let i = 0; i < videoSelectButtons.length; i++) {
    if (videoSelectButtons[i].textContent !== "") {
      if (
        videoProcessingList.find(
          (video) => video.title === videoSelectButtons[i].id
        ) === undefined
      ) {
        const short = new Short();

        short.title = videoSelectButtons[i].id;
        short.placement = Number.parseInt(videoSelectButtons[i].textContent);
        short.thumbnailSrc = videoThumbnails[i].textContent;

        videoProcessingList.push(short);
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

  currentVideosForProcessingContainer.textContent =
    JSON.stringify(videoProcessingList);

  console.log(currentVideosForProcessingContainer.textContent);
}

export default handleNextPageButtonClicked;