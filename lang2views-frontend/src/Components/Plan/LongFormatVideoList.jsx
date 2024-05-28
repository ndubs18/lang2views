import React, { useEffect, useState } from "react";
import LongFormatVideo from "./LongFormatVideo";
import Save from "./LongFormatStepSave";
import "./clientPlan.css";
import {
  sortDurationMostToLeast,
  sortViewsMostToLeast,
  sortViewsPerMinuteMostToLeast,
} from "../Utilities/sortAscending";
import handlePreviousPageButtonClicked from "./PreviousPageButtonClicked";
import handleNextPageButtonClicked from "./NextPageButtonClicked";

function LongFormatVideoList() {
  const [pageOf50Node, setPageOf50Node] = useState([]);
  const [previousButtonClicked, setPreviousButtonClicked] = useState("");
  const [nextButtonClicked, setNextButtonClicked] = useState("");
  const [tokenForPageToGet, setTokenForPageToGet] = useState("");

  useEffect(() => {
    const currentNumberToProcess = document.querySelector("#current-number-to-process");

    const currentVideosForProcessingContainer = document.querySelector(
      "#videos-for-processing-json"
    );
    if (nextButtonClicked === "" && previousButtonClicked === "") {
      currentVideosForProcessingContainer.textContent = JSON.stringify([]);
      currentNumberToProcess.value = 0;
    }

    const videos = [
      {
        thumbnailSrc: "./src/Images/brown.png",
        title: "A",
        duration: "10",
        views: "70",
        viewsPerMinute: "100",
        type: "longFormatVideo",
        done: false,
      },
      {
        thumbnailSrc: "./src/Images/brown.png",
        title: "B",
        duration: "9",
        views: "56",
        viewsPerMinute: "5",
        type: "short",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "C",
        duration: "8",
        views: "100",
        viewsPerMinute: "10",
        type: "short",
        done: false,
      },
      {
        thumbnailSrc: ".",
        title: "D",
        duration: "9",
        views: "22",
        viewsPerMinute: "22",
        type: "longFormatVideo",
        done: true,
      },
      {
        thumbnailSrc: ".",
        title: "E",
        duration: "10",
        views: "1",
        viewsPerMinute: "1",
        type: "longFormatVideo",
        done: false,
      },
  ];

  setPageOf50Node(videos);

    /* fetch("http://localhost:3000/client/getVideoPage", {
      method: "GET",
      body: {
        channelId: props.clientId,
        pageToken: tokenForPageToGet === "" ? null : tokenForPageToGet,
      },
    })
      .then((response) =>
        response.json().then((value) => setPageOf50Node(value))
      )
      .catch((err) => {
        throw new Error(err);
      }); */

    if (previousButtonClicked === "true") {
      setPreviousButtonClicked("false");
    } else if (nextButtonClicked === "true") {
      setNextButtonClicked("false");
    }
  }, [previousButtonClicked, nextButtonClicked]);

  const currentNumberToProcess = document.querySelector("#current-number-to-process");

  const [sortByDurationHidden, setSortByDurationHidden] = useState(true);
  const [noSortHidden, setNoSortHidden] = useState(false);
  const [sortByViewsHidden, setSortByViewsHidden] = useState(true);
  const [sortByViewsPerMinuteHidden, setSortByViewsPerMinuteHidden] =
    useState(true);
  const [durationFilterStatus, setDurationFilterStatus] = useState("");
  const [viewsFilterStatus, setViewsFilterStatus] = useState("");
  const [viewsPerMinuteFilterStatus, setViewsPerMinuteFilterStatus] =
    useState("");
  const [durationFilterActive, setDurationFilterActive] = useState(
    "filter-button-inactive"
  );
  const [viewsFilterActive, setViewsFilterActive] = useState(
    "filter-button-inactive"
  );
  const [viewsPerMinuteFilterActive, setViewsPerMinuteFilterActive] = useState(
    "filter-button-inactive"
  );

  const longFormatVideos = pageOf50Node.filter((video) => video.type === "longFormatVideo");

  const videosUnsorted = [];
  for (
    let numVideo = 0;
    numVideo < longFormatVideos.length;
    numVideo = numVideo + 3
  ) {
    const videoRow = [];
    const firstVideoInRowDetails = longFormatVideos[numVideo];
      videoRow.push(<LongFormatVideo videoDetails={firstVideoInRowDetails} />);

    const secondVideoInRowDetails = longFormatVideos[numVideo + 1];
    videoRow.push(
      secondVideoInRowDetails ? (
        <LongFormatVideo videoDetails={secondVideoInRowDetails} />
      ) : null
    );

    const thirdVideoInRowDetails = longFormatVideos[numVideo + 2];
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

    videosUnsorted.push(videoRowContainer);
  }

  let videosByDuration = longFormatVideos;
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

  let videosByViews = longFormatVideos;
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

  let videosByViewsPerMinute = longFormatVideos;
  sortViewsPerMinuteMostToLeast(videosByViewsPerMinute);
  const videosMostToLeastViewsPerMinute = [];
  for (
    let numVideo = 0;
    numVideo < longFormatVideos.length;
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
      <div className="d-flex flex-row ms-5 mb-5 filter-buttons-container">
        <p className="align-middle fs-4 mt-2 me-4">Filters:</p>
        <button
          className={durationFilterActive + " btn"}
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
          className={viewsFilterActive + " btn"}
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
          className={viewsPerMinuteFilterActive + " btn"}
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
        <div hidden={noSortHidden}>{videosUnsorted}</div>
        <div hidden={sortByDurationHidden}>{videosMostToLeastDuration}</div>
        <div hidden={sortByViewsHidden}>{videosMostToLeastViews}</div>
        <div hidden={sortByViewsPerMinuteHidden}>
          {videosMostToLeastViewsPerMinute}
        </div>
      </div>
      <div
        className="d-flex flex-row justify-content-center"
        id="previous-next-videos-buttons-container"
      >
        <button
          className="btn btn-primary"
          onClick={() => {setPreviousButtonClicked("true"); handlePreviousPageButtonClicked(); setTokenForPageToGet(pageOf50Node.prevPageToken)}}
        >
          Previous 50 videos
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {setNextButtonClicked("true"); handleNextPageButtonClicked(); setTokenForPageToGet(pageOf50Node.nextPageToken)}}
        >
          Next 50 videos
        </button>
      </div>
      <div className="horizontal-line"></div>
      <input id="current-number-to-process" hidden type="number" value={currentNumberToProcess ? currentNumberToProcess.value : 0} />
      <Save />
    </>
  );
}

export default LongFormatVideoList;
