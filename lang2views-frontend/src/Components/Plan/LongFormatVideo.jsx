import "./videos.css";

function LongFormatVideo(props) {
  if (props === null)
    throw new Error("props is null in plan -> LongFormatVideo component");

  if (props.videoDetails === null)
    throw new Error(
      "videoDetails object is null in plan -> LongFormatVideo component"
    );

  return (
    <div className="d-flex flex-column video-seperation">
      <div>
        <img
          src={props.videoDetails.thumbnailSrc}
          className="long-format-video-thumbnail"
        >
        </img>
        <button className="rounded rounded-circle long-format-video-select-button"></button>
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
