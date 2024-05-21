import React, { useEffect, useState } from "react";
import LongFormatVideo from "./LongFormatVideo";
import Save from "./LongFormatStepSave";
import "./clientPlan.css";
import {
  sortDurationMostToLeast,
  sortViewsMostToLeast,
  sortViewsPerMinuteMostToLeast,
} from "../Utilities/sortAscending";

function LongFormatVideoList(props) {
  const [pageOf50Node, setPageOf50Node] = useState({});
  const [previousButtonClicked, setPreviousButtonClicked] = useState("");
  const [nextButtonClicked, setNextButtonClicked] = useState("");
  const [tokenForPageToGet, setTokenForPageToGet] = useState("");

  useEffect(() => {
    if (previousButtonClicked === "false") return;
    else if (nextButtonClicked === "false") return;

    fetch("http://localhost:3000/client/getVideoPage", {
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
      });

    if (previousButtonClicked === "true") {
      setPreviousButtonClicked("false");
    } else if (nextButtonClicked === "true") {
      setNextButtonClicked("false");
    }
  }, [previousButtonClicked, nextButtonClicked]);

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

  /* const props = {
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
        thumbnailSrc: "./src/Images/brown.png",
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
  }; */

  const videosUnsorted = [];
  for (
    let numVideo = 0;
    numVideo < pageOf50Node.videos.length;
    numVideo = numVideo + 3
  ) {
    const videoRow = [];
    const firstVideoInRowDetails = pageOf50Node.videos[numVideo];
    videoRow.push(<LongFormatVideo videoDetails={firstVideoInRowDetails} />);

    const secondVideoInRowDetails = pageOf50Node.videos[numVideo + 1];
    videoRow.push(
      secondVideoInRowDetails ? (
        <LongFormatVideo videoDetails={secondVideoInRowDetails} />
      ) : null
    );

    const thirdVideoInRowDetails = pageOf50Node.videos[numVideo + 2];
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

  let videosByDuration = pageOf50Node.videos;
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

  let videosByViews = pageOf50Node.videos;
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

  let videosByViewsPerMinute = pageOf50Node.videos;
  sortViewsPerMinuteMostToLeast(videosByViewsPerMinute);
  const videosMostToLeastViewsPerMinute = [];
  for (
    let numVideo = 0;
    numVideo < pageOf50Node.videos.length;
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
          onClick={() => {setPreviousButtonClicked("true"); setTokenForPageToGet(pageOf50Node.prevPageToken)}}
        >
          Previous 50 videos
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {setNextButtonClicked("true"); setTokenForPageToGet(pageOf50Node.nextPageToken)}}
        >
          Next 50 videos
        </button>
      </div>
      <div className="horizontal-line"></div>
      <input id="current-number-to-process" hidden type="number" value={0} />
      <Save />
    </>
  );
}

export default LongFormatVideoList;
