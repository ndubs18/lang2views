import "../videos.css";

function handleSelectButton(event) {
  const currentVideoSelectButton = document.querySelector(`#${event.target.id}`);

  if (currentVideoSelectButton.textContent === "") {
    const currentNumber = document.querySelector("#current-number-to-process");

    currentNumber.value = Number.parseInt(currentNumber.value) + 1;

    const buttonsWithSameIdAsCurrent = document.querySelectorAll(`#${event.target.id}`);

    buttonsWithSameIdAsCurrent[0].textContent = currentNumber.value;
    buttonsWithSameIdAsCurrent[1].textContent = currentNumber.value;
    buttonsWithSameIdAsCurrent[2].textContent = currentNumber.value;
    buttonsWithSameIdAsCurrent[3].textContent = currentNumber.value;
  }
  else {
    const allVideosButtons = document.querySelectorAll(".long-format-video-select-button");

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

function LongFormatVideo(props) {
  if (props === null)
    throw new Error("props is null in plan -> LongFormatVideo component");

  if (props.videoDetails === null)
    throw new Error(
      "videoDetails object is null in plan -> LongFormatVideo component"
    );

  return (
    <div className="d-flex flex-column video-seperation">
      <div style={{ width: "100%", height: "100%", backgroundImage: `url(${props.videoDetails.thumbnailSrc})`}}>
        <button className="rounded rounded-circle long-format-video-select-button" onClick={handleSelectButton} id={props.videoDetails.title} disabled={props.videoDetails.done}></button>
        <div id={props.videoDetails.title + "-thumbnail"}>{props.videoDetails.thumbnailSrc}</div>
      </div>
      <p>{props.videoDetails.title}</p>
      <div className="d-flex flex-row">
        <p className="me-2 text-secondary">{props.videoDetails.duration} Min</p>
        <p className="me-2 text-secondary">{props.videoDetails.views} Views</p>
        <p className="me-2 text-secondary">
          {props.videoDetails.viewsPerMinute} Views/Min
        </p>
      </div>
    </div>
  );
}

export default LongFormatVideo;
