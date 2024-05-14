function sortViewsMostToLeast(videos) {
    videos.sort((currentVideo, nextVideo) => {
        if (currentVideo.numViews < nextVideo.numViews)
            return 1;
        else if (currentVideo.numViews > nextVideo.numViews)
            return -1;
        else
            return 0;
    });
}

function sortViewsPerMinuteMostToLeast(videos) {
    videos.sort((currentVideo, nextVideo) => {
        if (currentVideo.numViewsPerMinute < nextVideo.numViewsPerMinute)
            return 1;
        else if (currentVideo.numViewsPerMinute > nextVideo.numViewsPerMinute)
            return -1;
        else
            return 0;
    });
}

function sortDurationMostToLeast(videos) {
    videos.sort((currentVideo, nextVideo) => {
        if (currentVideo.duration < nextVideo.duration)
            return 1;
        else if (currentVideo.duration > nextVideo.duration)
            return -1;
        else
            return 0;
    });
}

export {sortViewsMostToLeast, sortViewsPerMinuteMostToLeast, sortDurationMostToLeast};