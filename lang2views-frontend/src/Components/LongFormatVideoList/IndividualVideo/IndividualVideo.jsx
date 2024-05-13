import "./IndividualVideo.css";
import PlaceholderIcon from "../../../Images/brown.png";

function IndividualVideo({ videoNumber, videoName, thumbnailImage }) {
  return (
    <div className="video-container">
      <div className="check-and-video-name">
        <img className="check-box" src={PlaceholderIcon} alt="Checkbox" />
        <p className="video-number">{videoNumber}</p>
        <p className="video-name">{videoName}</p>
      </div>
      <div className="thumbnail">
        <img
          className="thumbnail-image"
          src={thumbnailImage}
          alt="thumbnail image"
        />
      </div>
      <div className="four-buttons">
        <img
          className="organize-button widget-buttons"
          src={PlaceholderIcon}
          alt="Organize button"
        />
        <img
          className="post-production-button widget-buttons"
          src={PlaceholderIcon}
          alt="Post production button"
        />
        <img
          className="upload-button widget-buttons"
          src={PlaceholderIcon}
          alt="Upload button"
        />
        <img
          className="delete-button widget-buttons"
          src={PlaceholderIcon}
          alt="Delete button"
        />
      </div>
    </div>
  );
}

export default IndividualVideo;
