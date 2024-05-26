import "../sampleSettings.css";
import Save from "./UploadStepSave";

function GrantYoutubeAccess() {
  return (
    <div className="mb-3">
      <h2 className="ms-5 mb-2">Grant YouTube Access</h2>
      <div className="d-flex flex-row justify-content-between ms-5">
        <div className="d-flex flex-row">
          <button className="pale-green-button youtube-login px-3 py-2">
            <span className="d-flex flex-row justify-content-center">
              <p className="align-self-center mb-0 me-2">Log in</p>
              <img className="" src="./brown.png" />
            </span>
          </button>
        </div>
      </div>
      <div className="grant-youtube-access-section-value" hidden></div>
    </div>
  );
}

function Upload(props) {
  if (props === null)
    return new Error("props for YoutubeAccess in client settings is null");

  if (props.channelName === null)
    return new Error("No channelName for upload section of clientSettings");

  return (
    <div>
      <GrantYoutubeAccess />
      <div className="horizontal-line"></div>
      <Save />
    </div>
  );
}

export default Upload