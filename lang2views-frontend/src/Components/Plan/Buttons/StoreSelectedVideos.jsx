function sortOrderOfVideos(videos) {
  videos.sort((currentVideo, nextVideo) => {
    if (currentVideo.placement > nextVideo.placement) return 1;
    else if (currentVideo.placement < nextVideo.placement) return -1;
    else return 0;
  });
}

function storeSelectedVideos() {
    const currentVideosForProcessingContainer = document.querySelector(
    "#videos-for-processing-json"
    );
    const currentVideosForProcessing = JSON.parse(
    currentVideosForProcessingContainer.textContent
    );

    let videoProcessingList = currentVideosForProcessing;

    const videoSelectButtonsWithDuplicates = document.querySelectorAll(".video-select-button");
    const videoSelectButtons = [...new Set(videoSelectButtonsWithDuplicates)];

    for (let i = 0; i < videoSelectButtons.length; i++) {
        if (videoSelectButtons[i].textContent !== "") {
            const videoId = videoSelectButtons[i].id;
            if (videoProcessingList.find((video) => video.id === videoSelectButtons[i].id) === undefined) {
                const videoData = document.getElementById(`${videoId}-data`).textContent
                const videoToStore = JSON.parse(videoData)

                videoProcessingList.push(videoToStore);
            }
        } else {
            const removedVideo = videoProcessingList.find(
            (video) => video.id === videoSelectButtons[i].id
            );
      
            if (removedVideo !== undefined) {
            videoProcessingList = videoProcessingList.filter(
                (video) => video.id !== videoSelectButtons[i].id
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

export default storeSelectedVideos;
