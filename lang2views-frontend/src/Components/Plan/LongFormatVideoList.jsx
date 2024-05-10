import React from "react";
import LongFormatVideo from "./LongFormatVideo";
import Save from "./LongFormatStepSave";

function LongFormatVideoList() {
  const props = {
    longFormatVideos: [
      {
        thumbnailSrc: "",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
      },
      {
        thumbnailSrc: "",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
      },
      {
        thumbnailSrc: "",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
      },
    ],
  };

  const videos = [];

  if (props.longFormatVideos === null)
    throw new Error("Need to have LongFormatVideos to display");

  for (let i = 0; i < props.longFormatVideos.length; i++) {
    const videoDetails = props.longFormatVideos[i];

    videos.push(<LongFormatVideo videoDetails={videoDetails}/>);
  }

  const videosContainer = React.createElement(
    "div",
    { className: "d-flex flex-row" },
    videos
  );

  return (
    <>
      {videosContainer}
      <div className="horizontal-line"></div>
      <Save />
    </>
  );
}

export default LongFormatVideoList;
