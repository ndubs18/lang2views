import React, { useState } from "react";
import LongFormatVideo from "./LongFormatVideo";
import Save from "./LongFormatStepSave";
import "./clientPlan.css";
import {
  sortDurationMostToLeast,
  sortViewsMostToLeast,
  sortViewsPerMinuteMostToLeast,
} from "../Utilities/sortAscending";

function LongFormatVideoList() {
  const [sortByDurationHidden, setSortByDurationHidden] = useState(true);
  const [noSortHidden, setNoSortHidden] = useState(false);
  const [sortByViewsHidden, setSortByViewsHidden] = useState(true);
  const [sortByViewsPerMinuteHidden, setSortByViewsPerMinuteHidden] =
    useState(true);
  const [durationFilterStatus, setDurationFilterStatus] = useState("");
  const [viewsFilterStatus, setViewsFilterStatus] = useState("");
  const [viewsPerMinuteFilterStatus, setViewsPerMinuteFilterStatus] =
    useState("");
    const [durationFilterActive, setDurationFilterActive] = useState("filter-button-inactive");
    const [viewsFilterActive, setViewsFilterActive] = useState("filter-button-inactive");
    const [viewsPerMinuteFilterActive, setViewsPerMinuteFilterActive] = useState("filter-button-inactive");

  const props = {
    longFormatVideos: [
      {
        thumbnailSrc: "./src/Images/brown.png",
        title: "A",
        duration: "10",
        views: "70",
        viewsPerMinute: "100",
        done: true,
      },
      {
        thumbnailSrc: ".",
        title: "B",
        duration: "9",
        views: "56",
        viewsPerMinute: "5",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "C",
        duration: "8",
        views: "100",
        viewsPerMinute: "10",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "D",
        duration: "9",
        views: "22",
        viewsPerMinute: "22",
        done: true,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "1",
        viewsPerMinute: "1",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "A",
        duration: "10",
        views: "3",
        viewsPerMinute: "3",
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

  if (props.longFormatVideos === null)
    throw new Error("Need to have LongFormatVideos to display");

  const videos = [];
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

  let videosByDuration = props.longFormatVideos;
  sortDurationMostToLeast(videosByDuration);
  const videosMostToLeastDuration = [];
  for (
    let numVideo = 0;
    numVideo < videosByDuration.length;
    numVideo = numVideo + 3
  ) {
    const videoRow = [];
    const firstVideoInRowDetails = videosByDuration[numVideo];
    videoRow.push(<LongFormatVideo videoDetails={firstVideoInRowDetails} />);

    const secondVideoInRowDetails = videosByDuration[numVideo + 1];
    videoRow.push(
      secondVideoInRowDetails ? (
        <LongFormatVideo videoDetails={secondVideoInRowDetails} />
      ) : null
    );

    const thirdVideoInRowDetails = videosByDuration[numVideo + 2];
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

    videosMostToLeastDuration.push(videoRowContainer);
  }

  let videosByViews = props.longFormatVideos;
  sortViewsMostToLeast(videosByViews);
  const videosMostToLeastViews = [];
  for (
    let numVideo = 0;
    numVideo < videosByViews.length;
    numVideo = numVideo + 3
  ) {
    const videoRow = [];
    const firstVideoInRowDetails = videosByViews[numVideo];
    videoRow.push(<LongFormatVideo videoDetails={firstVideoInRowDetails} />);

    const secondVideoInRowDetails = videosByViews[numVideo + 1];
    videoRow.push(
      secondVideoInRowDetails ? (
        <LongFormatVideo videoDetails={secondVideoInRowDetails} />
      ) : null
    );

    const thirdVideoInRowDetails = videosByViews[numVideo + 2];
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

    videosMostToLeastViews.push(videoRowContainer);
  }

  let videosByViewsPerMinute = props.longFormatVideos;
  sortViewsPerMinuteMostToLeast(videosByViewsPerMinute);
  const videosMostToLeastViewsPerMinute = [];
  for (
    let numVideo = 0;
    numVideo < props.longFormatVideos.length;
    numVideo = numVideo + 3
  ) {
    const videoRow = [];
    const firstVideoInRowDetails = videosByViewsPerMinute[numVideo];
    videoRow.push(<LongFormatVideo videoDetails={firstVideoInRowDetails} />);

    const secondVideoInRowDetails = videosByViewsPerMinute[numVideo + 1];
    videoRow.push(
      secondVideoInRowDetails ? (
        <LongFormatVideo videoDetails={secondVideoInRowDetails} />
      ) : null
    );

    const thirdVideoInRowDetails = videosByViewsPerMinute[numVideo + 2];
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

    videosMostToLeastViewsPerMinute.push(videoRowContainer);
  }

  return (
    <>
      <div>
        <button className={durationFilterActive}
          value={durationFilterStatus}
          onClick={(event) => {
            if (event.target.value === "clicked") {
              setSortByDurationHidden(true);
              setNoSortHidden(false);
              setSortByViewsHidden(true);
              setSortByViewsPerMinuteHidden(true);
              setDurationFilterStatus("");
              setDurationFilterActive("filter-button-inactive");
              setViewsFilterActive("filter-button-inactive");
              setViewsPerMinuteFilterActive("filter-button-inactive");
            } else {
              setSortByDurationHidden(false);
              setNoSortHidden(true);
              setSortByViewsHidden(true);
              setSortByViewsPerMinuteHidden(true);
              setDurationFilterStatus("clicked");
              setViewsFilterStatus("");
              setViewsPerMinuteFilterStatus("");
              setDurationFilterActive("filter-button-active");
              setViewsFilterActive("filter-button-inactive");
              setViewsPerMinuteFilterActive("filter-button-inactive");
            }
          }}
        >
          Duration
        </button>
        <button
          className={viewsFilterActive}
          value={viewsFilterStatus}
          onClick={(event) => {
            if (event.target.value === "clicked") {
              setSortByViewsHidden(true);
              setNoSortHidden(false);
              setSortByDurationHidden(true);
              setSortByViewsPerMinuteHidden(true);
              setViewsFilterStatus("");
              setDurationFilterActive("filter-button-inactive");
              setViewsFilterActive("filter-button-inactive");
              setViewsPerMinuteFilterActive("filter-button-inactive");
            } else {
              setSortByViewsHidden(false);
              setNoSortHidden(true);
              setSortByDurationHidden(true);
              setSortByViewsPerMinuteHidden(true);
              setViewsFilterStatus("clicked");
              setDurationFilterStatus("");
              setViewsPerMinuteFilterStatus("");
              setDurationFilterActive("filter-button-inactive");
              setViewsFilterActive("filter-button-active");
              setViewsPerMinuteFilterActive("filter-button-inactive");
            }
          }}
        >
          Views
        </button>
        <button
          className={viewsPerMinuteFilterActive}
          value={viewsPerMinuteFilterStatus}
          onClick={(event) => {
            if (event.target.value === "clicked") {
              setSortByViewsPerMinuteHidden(true);
              setNoSortHidden(false);
              setSortByDurationHidden(true);
              setSortByViewsHidden(true);
              setViewsPerMinuteFilterStatus("");
              setDurationFilterActive("filter-button-inactive");
              setViewsFilterActive("filter-button-inactive");
              setViewsPerMinuteFilterActive("filter-button-inactive");
            } else {
              setSortByViewsPerMinuteHidden(false);
              setNoSortHidden(true);
              setSortByDurationHidden(true);
              setSortByViewsHidden(true);
              setViewsPerMinuteFilterStatus("clicked");
              setDurationFilterStatus("");
              setViewsFilterStatus("");
              setDurationFilterActive("filter-button-inactive");
              setViewsFilterActive("filter-button-inactive");
              setViewsPerMinuteFilterActive("filter-button-active");
            }
          }}
        >
          Views per minute
        </button>
      </div>
      <div className="scrollable-video-list">
        <div hidden={noSortHidden}>{videos}</div>
        <div hidden={sortByDurationHidden}>{videosMostToLeastDuration}</div>
        <div hidden={sortByViewsHidden}>{videosMostToLeastViews}</div>
        <div hidden={sortByViewsPerMinuteHidden}>
          {videosMostToLeastViewsPerMinute}
        </div>
      </div>
      <div className="horizontal-line"></div>
      <input id="current-number-to-process" hidden type="number" value={0} />
      <Save />
    </>
  );
}

export default LongFormatVideoList;
