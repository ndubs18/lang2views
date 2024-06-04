import "./IndividualVideo.css";
import PlaceholderIcon from "../../../Images/brown.png";
import BlankCheckbox from "../../../Icons/blank_check_box.svg";
import BlackCheckbox from "../../../Icons/check_box.svg";
import FolderIcon from "../../../Icons/folder.svg";
import ProjectIcon from "../../../Icons/project.svg";
import YouTubeIcon from "../../../Icons/youtube.svg";
import TrashIcon from "../../../Icons/trash.svg";
import { useState } from "react";
import { useGlobalContext } from "../../../Context/globalContext";

function IndividualVideo({ videoNumber, videoName, thumbnailImage, videoId, sendVideoId }) {
    const [checkbox, setCheckbox] = useState(false);
    const {
        isOrganizeVisible,
        setIsOrganizeVisible,
        isPostProductionVisible,
        setIsPostProductionVisible,
        isUploadVisible,
        setIsUploadVisible,
        isDeleteVisible,
        setIsDeleteVisible,
    } = useGlobalContext();

    function toggleOrganizeModal() {
        if (isOrganizeVisible) {
            setIsOrganizeVisible(false);
        } else {
            sendVideoId(videoId);
            setIsOrganizeVisible(true);
        }
    }

    function togglePostProductionModal() {
        if (isPostProductionVisible) {
            setIsPostProductionVisible(false);
        } else {
            sendVideoId(videoId);
            setIsPostProductionVisible(true);
    }
    }

    function toggleUploadModal() {
        if (isUploadVisible) {
            setIsUploadVisible(false);
        } else {
            sendVideoId(videoId);
            setIsUploadVisible(true);
        }
    }

    function toggleDeleteModal() {
        if (isDeleteVisible) {
            setIsDeleteVisible(false);
        } else {
            sendVideoId(videoId);
            setIsDeleteVisible(true);
        }
    }

  return (
    <div className="video-container">
      <div className="check-and-video-name">
        <img
          className="check-box"
          src={!checkbox ? BlankCheckbox : BlackCheckbox}
          alt="Checkbox"
        />
        <p className="video-number">{videoNumber}</p>
        <p className="video-name">{videoName}</p>
      </div>
      <div className="thumbnail">
        <img
          className="thumbnail-image"
          src={thumbnailImage ? thumbnailImage : PlaceholderIcon}
          alt="thumbnail image"
        />
      </div>
      <div className="four-buttons">
        <img
          className="widget-buttons"
          src={FolderIcon}
          alt="Organize button"
          title="Organize"
          onClick={toggleOrganizeModal}
        />
        <img
          className="widget-buttons"
          src={ProjectIcon}
          alt="Post production button"
          title="Post-produce"
          onClick={togglePostProductionModal}
        />
        <img
          className="widget-buttons"
          src={YouTubeIcon}
          alt="Upload button"
          title="Upload"
          onClick={toggleUploadModal}
        />
        <img
          className="widget-buttons"
          src={TrashIcon}
          alt="Delete button"
          title="Delete"
          onClick={toggleDeleteModal}
        />
      </div>
    </div>
  );
}

export default IndividualVideo;
