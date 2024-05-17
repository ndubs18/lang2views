function sortViewsMostToLeast(videos) {
    videos.sort((currentVideo, nextVideo) => {
        if (Number.parseInt(currentVideo.views) < Number.parseInt(nextVideo.views))
            return 1;
        else if (Number.parseInt(currentVideo.views) > Number.parseInt(nextVideo.views))
            return -1;
        else
            return 0;
    });
}

function sortViewsPerMinuteMostToLeast(videos) {
    videos.sort((currentVideo, nextVideo) => {
        if (Number.parseInt(currentVideo.viewsPerMinute) < Number.parseInt(nextVideo.viewsPerMinute))
            return 1;
        else if (Number.parseInt(currentVideo.viewsPerMinute) > Number.parseInt(nextVideo.viewsPerMinute))
            return -1;
        else
            return 0;
    });
}

function sortDurationMostToLeast(videos) {
    videos.sort((currentVideo, nextVideo) => {
        if (Number.parseInt(currentVideo.duration) < Number.parseInt(nextVideo.duration))
            return 1;
        else if (Number.parseInt(currentVideo.duration) > Number.parseInt(nextVideo.duration))
            return -1;
        else
            return 0;
    });
}

export {sortViewsMostToLeast, sortViewsPerMinuteMostToLeast, sortDurationMostToLeast};