import React, { useState } from "react";
import Short from "./Short";
import Save from "./ShortsStepSave";
import "./clientPlan.css";
import { sortViewsMostToLeast } from "../Utilities/sortAscending";

function ShortsList() {
  const [noSortHidden, setNoSortHidden] = useState(false);
  const [sortByViewsHidden, setSortByViewsHidden] = useState(true);
  const [viewsFilterStatus, setViewsFilterStatus] = useState("");
  const [viewsFilterActive, setViewsFilterActive] = useState("filter-button-inactive");

  const props = {
    shorts: [
      {
        thumbnailSrc: "./src/Images/brown.png",
        title: "A",
        duration: "10",
        views: "50",
        viewsPerMinute: "100",
        done: true,
      },
      {
        thumbnailSrc: "./src/Images/brown.png",
        title: "B",
        duration: "60",
        views: "70",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: "./src/Images/brown.png",
        title: "C",
        duration: "3",
        views: "3",
        viewsPerMinute: "100",
        done: false,
      },
      {
        thumbnailSrc: "./src/Images/brown.png",
        title: "D",
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

    const videoRowContainer = React.createElement(
      "div",
      { className: "d-flex flex-row" },
      videoRow
    );

    videos.push(videoRowContainer);
  }

  const videosMostToLeastViews = [];
  let videosByViews = props.shorts;
  sortViewsMostToLeast(videosByViews);
  for (
    let numVideo = 0;
    numVideo < videosByViews.length;
    numVideo = numVideo + 5
  ) {
    const videoRow = [];
    const firstVideoInRowDetails = videosByViews[numVideo];
    videoRow.push(<Short videoDetails={firstVideoInRowDetails} />);

    const secondVideoInRowDetails = videosByViews[numVideo + 1];
    videoRow.push(
      secondVideoInRowDetails ? (
        <Short videoDetails={secondVideoInRowDetails} />
      ) : null
    );

    const thirdVideoInRowDetails = videosByViews[numVideo + 2];
    videoRow.push(
      thirdVideoInRowDetails ? (
        <Short videoDetails={thirdVideoInRowDetails} />
      ) : null
    );

    const fourthVideoInRowDetails = videosByViews[numVideo + 3];
    videoRow.push(
      fourthVideoInRowDetails ? (
        <Short videoDetails={fourthVideoInRowDetails} />
      ) : null
    );

    const fifthVideoInRowDetails = videosByViews[numVideo + 4];
    videoRow.push(
      fifthVideoInRowDetails ? (
        <Short videoDetails={fifthVideoInRowDetails} />
      ) : null
    );

    const videoRowContainer = React.createElement(
      "div",
      { className: "d-flex flex-row" },
      videoRow
    );

    videosMostToLeastViews.push(videoRowContainer);
  }

  return (
    <>
      <div className="d-flex flex-row ms-5 mb-5 filter-buttons-container">
        <p className="align-middle fs-4 mt-2 me-4">Filters:</p>
        <button
          className={viewsFilterActive + " btn"}
          value={viewsFilterStatus}
          onClick={(event) => {
            if (event.target.value === "clicked") {
              setNoSortHidden(false);
              setSortByViewsHidden(true);
              setViewsFilterStatus("");
              setViewsFilterActive("filter-button-inactive");
            } else {
              setNoSortHidden(true);
              setSortByViewsHidden(false);
              setViewsFilterStatus("clicked");
              setViewsFilterActive("filter-button-active");
            }
          }}
        >
          Views
        </button>
      </div>
      <div className="scrollable-video-list">
        <div hidden={noSortHidden}>{videos}</div>
        <div hidden={sortByViewsHidden}>{videosMostToLeastViews}</div>
      </div>
      <div className="horizontal-line"></div>
      <input id="current-number-to-process" hidden type="number" value={0} />
      <Save />
    </>
  );
}

export default ShortsList;
