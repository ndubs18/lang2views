import React from "react";
import LongFormatVideo from "./LongFormatVideo";
import Save from "./LongFormatStepSave";
import "./clientPlan.css";

function LongFormatVideoList() {
  const props = {
    longFormatVideos: [
      {
        thumbnailSrc: "./src/Images/brown.png",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true,
      },
      {
        thumbnailSrc: ".",
        title: "B",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "C",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "D",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false,
      },
    ],
  };

  const videos = [];

  if (props.longFormatVideos === null)
    throw new Error("Need to have LongFormatVideos to display");

  for (
    let numVideo = 0;
    numVideo < props.longFormatVideos.length;
    numVideo = numVideo + 3
  ) {
    const videoRow = [];
    const firstVideoInRowDetails = props.longFormatVideos[numVideo];
    videoRow.push(<LongFormatVideo videoDetails={firstVideoInRowDetails} />);

    const secondVideoInRowDetails = props.longFormatVideos[numVideo + 1];
    videoRow.push(
      secondVideoInRowDetails ? (
        <LongFormatVideo videoDetails={secondVideoInRowDetails} />
      ) : null
    );

    const thirdVideoInRowDetails = props.longFormatVideos[numVideo + 2];
    videoRow.push(
      thirdVideoInRowDetails ? (
        <LongFormatVideo videoDetails={thirdVideoInRowDetails} />
      ) : null
    );

    const videoRowContainer = React.createElement(
      "div",
      { className: "d-flex flex-row" },
      videoRow
    );

    videos.push(videoRowContainer);
  }

  return (
    <>
      <div className="scrollable-video-list">{videos}</div>
      <div className="horizontal-line"></div>
      <input id="current-number-to-process" hidden type="number" value={0} />
      <Save />
    </>
  );
}

export default LongFormatVideoList;
