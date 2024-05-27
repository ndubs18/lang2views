import "./videos.css";

function buttonClickHandler(event) {
  const currentVideoSelectButton = document.querySelector(`#${event.target.id}`);

  if (currentVideoSelectButton.textContent === "") {
    const currentNumber = document.querySelector("#current-number-to-process");

    currentNumber.value = Number.parseInt(currentNumber.value) + 1;

    currentVideoSelectButton.textContent = currentNumber.value;
  }
  else {
    const allVideosButtons = document.querySelectorAll(".shorts-select-button");

    const currentNumber = document.querySelector("#current-number-to-process");

    currentNumber.value = Number.parseInt(currentNumber.value) - 1;

    const placementOfCurrentVideoInProcessingOrder = currentVideoSelectButton.textContent;

    for (let i = 0; i < allVideosButtons.length; i++) {
      if (allVideosButtons[i].id === currentVideoSelectButton.id)
        currentVideoSelectButton.textContent = "";
      else {
        if (allVideosButtons[i].textContent !== "" && allVideosButtons[i].textContent > placementOfCurrentVideoInProcessingOrder)
          allVideosButtons[i].textContent = Number.parseInt(allVideosButtons[i].textContent) - 1;
      }
    }
  }
}

function Short(props) {
  if (props === null)
    throw new Error("props is null in plan -> Short component");

  if (props.videoDetails === null)
    throw new Error("videoDetails object is null in plan -> Short component");

  return (
    <div className="d-flex flex-column shorts-seperation short-container">
      <div style={{ width: "100%", height: "100%", backgroundImage: `url(${props.videoDetails.thumbnailSrc})`}}>
        <button className="rounded rounded-circle shorts-select-button" onClick={buttonClickHandler} id={props.videoDetails.title} disabled={props.videoDetails.done}></button>
      </div>
      <p>{props.videoDetails.title}</p>
      <div className="d-flex flex-row">
        <p className="fs-4 me-2 text-secondary">{props.videoDetails.views} Views</p>
      </div>
    </div>
  );
}

export default Short;
