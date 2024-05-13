import "./videos.css";

function Short(props) {
  console.log(props + "\n");
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
        <p className="fs-4 me-2 text-secondary">{props.videoDetails.views} Views</p>
      </div>
    </div>
  );
}

export default Short;
