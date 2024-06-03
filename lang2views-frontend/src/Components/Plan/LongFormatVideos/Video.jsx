import "../videos.css"

function handleSelectButton(event) {
    const currentVideoSelectButton = document.querySelector(`#${event.target.id}`);
    if (currentVideoSelectButton.textContent === "") {
        const currentNumber = document.querySelector("#current-number-to-process");

        currentNumber.value = Number.parseInt(currentNumber.value) + 1;
        const buttonsWithSameIdAsCurrent = document.querySelectorAll(`#${event.target.id}`);
        buttonsWithSameIdAsCurrent.forEach((button) => button.textContent = currentNumber.value) 
    }
    else {
        const allVideosButtons = document.querySelectorAll(".video-select-button");

        const currentNumber = document.querySelector("#current-number-to-process");

        currentNumber.value = Number.parseInt(currentNumber.value) - 1;

        const placementOfCurrentVideoInProcessingOrder = currentVideoSelectButton.textContent;

        for (let i = 0; i < allVideosButtons.length; i++) {
            if (allVideosButtons[i].id === currentVideoSelectButton.id)
                allVideosButtons[i].textContent = "";
            else {
                if (allVideosButtons[i].textContent !== "" && allVideosButtons[i].textContent > placementOfCurrentVideoInProcessingOrder)
                    allVideosButtons[i].textContent = Number.parseInt(allVideosButtons[i].textContent) - 1;
            }
        }
    }
}

function Video({ format, video }) {
    let videoId = ""
    let videoName = ""
    let duration = ""
    let finalized = ""
    let thumbnailSrc = ""

    if (video) {
        videoId = video.id
        videoName = video.name
        duration = `${video.duration.minutes}:${video.duration.seconds}`
        finalized = video.finalized
        thumbnailSrc = video.thumbnail.url
    }

    return (
        <div className={`d-flex flex-column video-container ${format}-seperation ${format=="short" ? "short-container" : ""}`}>
            <div style={{ width: "100%", height: "100%", backgroundImage: `url(${thumbnailSrc})`}}>
                <button className={`rounded rounded-circle ${format}-select-button video-select-button`} onClick={handleSelectButton} id={videoId} disabled={finalized}></button>
                <div id={videoId + "-thumbnail"}>{thumbnailSrc}</div>
            </div>
            <p>{videoName}</p>
            <div className="d-flex flex-row">
                {format == "long" ? (
                    <>
                        <p className="me-2 text-secondary">{duration} Min</p>
                        <p className="me-2 text-secondary">{/*video.views*/0} Views</p>
                        <p className="me-2 text-secondary">{/*video.viewsPerMinute*/0} Views/Min</p>
                    </>
                ) : (
                        <p className="fs-4 me-2 text-secondary">{/*video.views*/0} Views</p>
                )}

            </div>
        </div>
    );
}

export default Video;

