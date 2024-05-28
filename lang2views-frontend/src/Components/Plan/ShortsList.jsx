import React, { useEffect, useState } from "react";
import Short from "./Short";
import Save from "./ShortsStepSave";
import "./clientPlan.css";
import { sortViewsMostToLeast } from "../Utilities/sortAscending";
import handleNextPageButtonClicked from "./ShortsNextPageButtonClicked";
import handlePreviousPageButtonClicked from "./ShortsPreviousPageButtonClicked";

function ShortsList() {
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

  const currentNumberToProcess = document.querySelector(
    "#current-number-to-process"
  );

  const [noSortHidden, setNoSortHidden] = useState(false);
  const [sortByViewsHidden, setSortByViewsHidden] = useState(true);
  const [viewsFilterStatus, setViewsFilterStatus] = useState("");
  const [viewsFilterActive, setViewsFilterActive] = useState(
    "filter-button-inactive"
  );

  const shorts = pageOf50Node.filter((video) => video.type === "short");

  const videosUnsorted = [];
  for (let numVideo = 0; numVideo < shorts.length; numVideo = numVideo + 3) {
    const videoRow = [];
    const firstVideoInRowDetails = shorts[numVideo];
    videoRow.push(<Short videoDetails={firstVideoInRowDetails} />);

    const secondVideoInRowDetails = shorts[numVideo + 1];
    videoRow.push(
      secondVideoInRowDetails ? (
        <Short videoDetails={secondVideoInRowDetails} />
      ) : null
    );

    const thirdVideoInRowDetails = shorts[numVideo + 2];
    videoRow.push(
      thirdVideoInRowDetails ? (
        <Short videoDetails={thirdVideoInRowDetails} />
      ) : null
    );

    const fourthVideoInRowDetails = shorts[numVideo + 3];
    videoRow.push(
      fourthVideoInRowDetails ? (
        <Short videoDetails={fourthVideoInRowDetails} />
      ) : null
    );

    const fifthVideoInRowDetails = shorts[numVideo + 4];
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

    videosUnsorted.push(videoRowContainer);
  }

  let videosByViews = shorts;
  sortViewsMostToLeast(videosByViews);
  const videosMostToLeastViews = [];
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
              setSortByViewsHidden(true);
              setNoSortHidden(false);
              setViewsFilterStatus("");
              setViewsFilterActive("filter-button-inactive");
            } else {
              setSortByViewsHidden(false);
              setNoSortHidden(true);
              setViewsFilterStatus("clicked");
              setViewsFilterActive("filter-button-active");
            }
          }}
        >
          Views
        </button>
      </div>
      <div className="scrollable-video-list">
        <div hidden={noSortHidden}>{videosUnsorted}</div>
        <div hidden={sortByViewsHidden}>{videosMostToLeastViews}</div>
      </div>
      <div
        className="d-flex flex-row justify-content-center"
        id="previous-next-videos-buttons-container"
      >
        <button
          className="btn btn-primary"
          onClick={() => {
            setPreviousButtonClicked("true");
            handlePreviousPageButtonClicked();
            setTokenForPageToGet(pageOf50Node.prevPageToken);
          }}
        >
          Previous 50 videos
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setNextButtonClicked("true");
            handleNextPageButtonClicked();
            setTokenForPageToGet(pageOf50Node.nextPageToken);
          }}
        >
          Next 50 videos
        </button>
      </div>
      <div className="horizontal-line"></div>
      <input
        id="current-number-to-process"
        hidden
        type="number"
        value={currentNumberToProcess ? currentNumberToProcess.value : 0}
      />
      <Save />
    </>
  );
}

export default ShortsList;
