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

    // Get all buttons, filter to those with text content (i.e. selected), then grab just the id
    const selectedVideos = Array.from(document.querySelectorAll(".video-select-button")).filter((button) => {
        return button.textContent != ""
    }).map(button => button.id);
    
    const videoIds = [...new Set(selectedVideos)];

    for (let i = 0; i < videoIds.length; i++) {
        if (videoIds[i].textContent !== "") {
            const videoId = videoIds[i].slice(7); //Chop off the "button-" part of the id
            console.log(videoId)
            if (videoProcessingList.find((video) => video.id === videoIds[i]) === undefined) {
                const videoData = document.getElementById(`data-${videoId}`).textContent
                const videoToStore = JSON.parse(videoData)

                videoProcessingList.push(videoToStore);
            }
        } else {
            const removedVideo = videoProcessingList.find(
            (video) => video.id === videoIds[i]
            );
      
            if (removedVideo !== undefined) {
            videoProcessingList = videoProcessingList.filter(
                (video) => video.id !== videoIds[i]
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
