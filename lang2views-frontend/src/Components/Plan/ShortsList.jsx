import React from "react";
import Short from "./Short";
import Save from "./ShortsStepSave";
import "./clientPlan.css";

function ShortsList() {
  const props = {
    shorts: [
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: false
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "100",
        viewsPerMinute: "100",
        done: true
      },
    ],
  };

  const videos = [];

  if (props.shorts === null) throw new Error("Need to have shorts to display");

  for (
    let numVideo = 0;
    numVideo < props.shorts.length;
    numVideo = numVideo + 5
  ) {
    const videoRow = [];
    const firstVideoInRowDetails = props.shorts[numVideo];
    videoRow.push(<Short videoDetails={firstVideoInRowDetails} />);

    const secondVideoInRowDetails = props.shorts[numVideo + 1];
    videoRow.push(
      secondVideoInRowDetails ? (
        <Short videoDetails={secondVideoInRowDetails} />
      ) : null
    );

    const thirdVideoInRowDetails = props.shorts[numVideo + 2];
    videoRow.push(
      thirdVideoInRowDetails ? (
        <Short videoDetails={thirdVideoInRowDetails} />
      ) : null
    );

    const fourthVideoInRowDetails = props.shorts[numVideo + 3];
    videoRow.push(
      fourthVideoInRowDetails ? (
        <Short videoDetails={fourthVideoInRowDetails} />
      ) : null
    );

    const fifthVideoInRowDetails = props.shorts[numVideo + 4];
    videoRow.push(
      fifthVideoInRowDetails ? (
        <Short videoDetails={fifthVideoInRowDetails} />
      ) : null
    );

    const videoRowContainer = React.createElement("div", {className: "d-flex flex-row"}, videoRow);

    videos.push(videoRowContainer);
  }

  return (
    <>
      <div className="scrollable-video-list">{videos}</div>
      <div className="horizontal-line"></div>
      <Save />
    </>
  );
}

export default ShortsList;
