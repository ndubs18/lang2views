import "./shortFormatIndividualVideo.css";
import PlaceholderIcon from "../../../Images/brown.png";
import BlankCheckbox from "../../../Icons/blank_check_box.svg";
import BlackCheckbox from "../../../Icons/check_box.svg";
import FolderIcon from "../../../Icons/folder.svg";
import ProjectIcon from "../../../Icons/project.svg";
import YouTubeIcon from "../../../Icons/youtube.svg";
import TrashIcon from "../../../Icons/trash.svg";
import { useState } from "react";

function shortFormatIndividualVideo({
  videoNumber,
  videoName,
  thumbnailImage,
}) {
  const [checkbox, setCheckbox] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
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
          className="thumbnail-image-in-short-format"
          src={thumbnailImage ? thumbnailImage : PlaceholderIcon}
          alt="thumbnail image"
        />
      </div>
      <div className="four-buttons">
        <img
          className="organize-button widget-buttons"
          src={FolderIcon}
          alt="Organize button"
        />
        <img
          className="post-production-button widget-buttons"
          src={ProjectIcon}
          alt="Post production button"
        />
        <img
          className="upload-button widget-buttons"
          src={YouTubeIcon}
          alt="Upload button"
        />
        <img
          className="delete-button widget-buttons"
          src={TrashIcon}
          alt="Delete button"
        />
      </div>
    </div>
  );
}

export default shortFormatIndividualVideo;
