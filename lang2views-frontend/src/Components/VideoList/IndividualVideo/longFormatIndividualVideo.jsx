import "./longFormatIndividualVideo.css";
import PlaceholderIcon from "../../../Images/brown.png";
import BlankCheckbox from "../../../Icons/blank_check_box.svg";
import BlackCheckbox from "../../../Icons/check_box.svg";
import FolderIcon from "../../../Icons/folder.svg";
import ProjectIcon from "../../../Icons/project.svg";
import YouTubeIcon from "../../../Icons/youtube.svg";
import TrashIcon from "../../../Icons/trash.svg";
import { useState } from "react";
import { useGlobalContext } from "../../../Context/globalContext";

function LongFormatIndividualVideo({ videoNumber, videoName, thumbnailImage }) {
  const [checkbox, setCheckbox] = useState(false);
  const {
    isOrganizeVisible,
    setIsOrganizeVisible,
    isPostProductionVisible,
    setIsPostProductionVisible,
    isUploadVisible,
    setIsUploadVisible,
  } = useGlobalContext();

  function toggleOrganizeModal() {
    if (isOrganizeVisible) {
      setIsOrganizeVisible(false);
    } else {
      setIsOrganizeVisible(true);
    }
  }

  function togglePostProductionModal() {
    if (isPostProductionVisible) {
      setIsPostProductionVisible(false);
    } else {
      setIsPostProductionVisible(true);
    }
  }

  function toggleUploadModal() {
    if (isUploadVisible) {
      setIsUploadVisible(false);
    } else {
      setIsUploadVisible(true);
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
          onClick={toggleOrganizeModal}
        />
        <img
          className="widget-buttons"
          src={ProjectIcon}
          alt="Post production button"
          onClick={togglePostProductionModal}
        />
        <img
          className="widget-buttons"
          src={YouTubeIcon}
          alt="Upload button"
          onClick={toggleUploadModal}
        />
        <img className="widget-buttons" src={TrashIcon} alt="Delete button" />
      </div>
    </div>
  );
}

export default LongFormatIndividualVideo;
