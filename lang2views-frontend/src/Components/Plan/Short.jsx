import "./videos.css";

function Short(props) {
  if (props === null)
    throw new Error("props is null in plan -> Short component");

  if (props.videoDetails === null)
    throw new Error("videoDetails object is null in plan -> Short component");

  return (
    <div className="d-flex flex-column video-seperation">
      <div>
        <img src={props.videoDetails.thumbnailSrc}></img>
        <button className="rounded rounded-circle"></button>
      </div>
      <p>{props.videoDetails.title}</p>
      <div className="d-flex flex-row">
        <p className="me-2 text-secondary">{props.videoDetails.duration}</p>
        <p className="me-2 text-secondary">{props.videoDetails.views}</p>
        <p className="me-2 text-secondary">{props.videoDetails.viewsPerMinute}</p>
      </div>
    </div>
  );
}

export default Short;
