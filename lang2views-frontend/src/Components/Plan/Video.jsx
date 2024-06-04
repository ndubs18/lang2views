import "./videos.css"

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
    let videoId, videoName, duration, finalized, thumbnailSrc, views, viewsPerMin = ""

    if (video) {
        videoId = video.id
        videoName = video.name
        finalized = video.finalized
        thumbnailSrc = video.thumbnail.url
        views = video.views
        if (format == "long") {
            let hours = video.duration.hours;
            let min = video.duration.minutes;
            let sec = video.duration.seconds;
            duration = `${hours != 0 ? `0${hours}:` : ""}${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
            const totalSec = hours * 60 * 60 + min * 60 + sec;
            console.log("totalsec for "+ videoName + ":" + totalSec)
            viewsPerMin = Math.trunc((views / totalSec) * 60);
        }
    }

    return (
        <div className={`d-flex flex-column video-container ${format}-seperation ${format=="short" ? "short-container" : ""}`}>
            <div style={{ width: "100%", height: "100%", backgroundImage: `url(${thumbnailSrc})`}}>
                <button
                    id={`button-${videoId}`}
                    className={`rounded rounded-circle ${format}-select-button video-select-button`}
                    onClick={handleSelectButton}
                    disabled={finalized}/>
                <div id={`data-${videoId}`} style={{ display:"none" }}>{JSON.stringify(video)}</div>
                <div id={videoId + "-thumbnail"}>{thumbnailSrc}</div>
            </div>
            <p>{videoName}</p>
            <div className="d-flex flex-row">
                {format == "long" ? (
                    <>
                        <p className="me-2 text-secondary">{duration} Min</p>
                        <p className="me-2 text-secondary">{views} Views</p>
                        <p className="me-2 text-secondary">{viewsPerMin} Views/Min</p>
                    </>
                ) : (
                        <p className="fs-4 me-2 text-secondary">{views} Views</p>
                )}

            </div>
        </div>
    );
}

export default Video;

