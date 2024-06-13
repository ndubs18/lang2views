import { useEffect, useState } from "react";
import Video from "./Video";
import Save from "./Buttons/StepSave";
import "./clientPlan.css";
import {
  sortDurationMostToLeast,
  sortViewsMostToLeast,
  sortViewsPerMinuteMostToLeast,
} from "../Utilities/sortAscending";
import storeSelectedVideos from "./Buttons/StoreSelectedVideos";

const ACTIVE_BUTTON_CLASS = "filter-button-active";
const INACTIVE_BUTTON_CLASS = "filter-button-inactive";

function ClientPlanVideoList({ channelId, format }) {
    const [getVideosResult, setGetVideosResult] = useState([]);
    const [previousButtonClicked, setPreviousButtonClicked] = useState("");
    const [nextButtonClicked, setNextButtonClicked] = useState("");
    const [pageClicked, setPageClicked] = useState(false)
    let currentFilter = "unsorted"

    useEffect(() => {
        let pageToken = ""

        if (previousButtonClicked === "true") {
            setPreviousButtonClicked("false");
            if (getVideosResult && getVideosResult.previousPageToken) {
                pageToken = getVideosResult.previousPageToken;
            }
        } else if (nextButtonClicked === "true") {
            setNextButtonClicked("false");
            if (getVideosResult && getVideosResult.nextPageToken) {
                pageToken = getVideosResult.nextPageToken;
            }
        }

        fetch("http://localhost:3000/client/getVideoPage", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channelId: channelId,
                pageToken: pageToken
            }),
        })
            .then((response) => {
                response.json().then((value) => {
                    setGetVideosResult(value);
                })
            }
        )
        .catch((err) => {
        throw new Error(err);
        });
    }, [pageClicked]);

    const currentNumberToProcess = document.querySelector(
    "#current-number-to-process"
    );

    let videosUnsorted = [];
    let videosByDuration = [];

    if (getVideosResult.videos) {
        let filteredVideos = getVideosResult.videos.filter(
            (video) => video.format === format
        );
        filteredVideos.forEach((video) => {
            let newVideo = <Video
                key={video.id}
                format={format}
                video={video}
            />
            videosUnsorted.push(newVideo);
        })

        // Create copy that's sorted by duration
        // Alternative to this is re-rendering entire thing when we want to switch filters
        // (not great) or re-render child when list sort changes (couldn't get this to work
        // + hard to go back to "unsorted" in that case)
        videosByDuration = videosUnsorted.toSorted((a, b) => {
            let aDuration = a.props.video.duration
            let bDuration = b.props.video.duration
            if (aDuration.minutes != bDuration.minutes) {
                return bDuration.minutes - aDuration.minutes
            } else {
                return bDuration.seconds - aDuration.seconds
            }
        })
    }

    let viewsFilterActive = INACTIVE_BUTTON_CLASS;
    let durationFilterActive = INACTIVE_BUTTON_CLASS;
    let viewsPerMinuteFilterActive = INACTIVE_BUTTON_CLASS;

    function handleDurationClick() {
        let durationButton = document.getElementById("duration-button");
        let durationContainer = document.getElementById("sorted-by-duration");
        if (currentFilter == "duration") {
            durationButton.classList.replace(ACTIVE_BUTTON_CLASS, INACTIVE_BUTTON_CLASS);
            durationContainer.style.display = "none";
            document.getElementById(`sorted-by-unsorted`).style.display = "grid";
            currentFilter = "unsorted"
        } else {
            durationButton.classList.replace(INACTIVE_BUTTON_CLASS, ACTIVE_BUTTON_CLASS);
            document.getElementById(`sorted-by-${currentFilter}`).style.display = "none";
            durationContainer.style.display = "grid";
            currentFilter = "duration"
        }
    }

    function handleViewsClick() {

    }
    function handleViewsPerMinClick() {

    }


  return (
    <>
      <div className="d-flex flex-row filter-buttons-container">
        <p className="align-middle fs-4 mt-2 me-4">Filters:</p>
        {(format == "long") ? (
            <button
              id={"duration-button"}
              className={durationFilterActive + " btn"}
              onClick={handleDurationClick}
            >
              Duration
            </button>
          ) : null}
        <button
          id={"views-button"}
          className={viewsFilterActive + " btn"}
          onClick={handleViewsClick}
        >
          Views
        </button>
        {(format == "long") ? (
            <button
              id={"views-per-min-button"}
              className={viewsPerMinuteFilterActive + " btn"}
              onClick={handleViewsPerMinClick}
            >
              Views per minute
            </button>
          ) : null}
      </div>
          <hr style={{ margin: "0" }} />
          {(format == "long") ? (
              <div id="sorted-by-duration" style={{ display: "none" }} className="scrollable-video-list">{videosByDuration}</div>
              /*<div id="sorted-by-views-per-min" style={{ display: "none" }} className="scrollable-video-list">{videosByViewsPerMin}</div>*/
          ) : null}
        {/*
        TODO : uncomment once videos can return views
        <div id="sorted-by-views" style={{ display: "none" }} className="scrollable-video-list">{videosByViews}</div>
        */}
        <div id="sorted-by-unsorted" className="scrollable-video-list">{videosUnsorted}</div>
      <div
        className="d-flex flex-row justify-content-center"
        id="previous-next-videos-buttons-container"
      >
        <button
          className="btn btn-primary"
          onClick={() => {
            setPreviousButtonClicked("true");
            setPageClicked(!pageClicked);
            storeSelectedVideos();
          }}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setNextButtonClicked("true");
            setPageClicked(!pageClicked);
            storeSelectedVideos();
          }}
        >
          Next
        </button>
      </div>
      <hr />
      <input
        id="current-number-to-process"
        hidden
        type="number"
        value={currentNumberToProcess ? currentNumberToProcess.value : 0}
          />
      <div className="client-popup-footer">
          <Save channelId={channelId} />
      </div>
    </>
  );
}

export default ClientPlanVideoList;
