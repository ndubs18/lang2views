import "../clientSettings.css";
import Save from "./Save";

function disableUseSameDescription() {}

function enableUseSameDescription() {}

function disableUseSameTags() {}

function enableUseSameTags() {}

function GrantYoutubeAccess() {
  return <div className="mb-3"><h2 className="ms-5 mb-2">Grant YouTube Access</h2><div className="d-flex flex-row justify-content-between ms-5"><button className="pale-green-button btn">Log in</button><GrantYoutubeAccessToggles /></div></div>
}

function GrantYoutubeAccessToggles() {
  return (
    <div>
      <button
        className="btn btn-link text-decoration-none text-reset fs-4"
        onClick={disableUseSameDescription}
      >
        Disabled
      </button>
      <button
        className="btn btn-link text-decoration-none text-reset fs-4"
        onClick={enableUseSameDescription}
      >
        Enabled
      </button>
    </div>
  );
}

function UseSameDescriptionToggles() {
    return (
      <div>
        <button
          className="btn btn-link text-decoration-none text-reset fs-4"
          onClick={disableUseSameDescription}
        >
          Disabled
        </button>
        <button
          className="btn btn-link text-decoration-none text-reset fs-4"
          onClick={enableUseSameDescription}
        >
          Enabled
        </button>
      </div>
    );
  }

  function UseSameTagsToggles() {
    return (
      <div>
        <button
          className="btn btn-link text-decoration-none text-reset fs-4"
          onClick={disableUseSameTags}
        >
          Disabled
        </button>
        <button
          className="btn btn-link text-decoration-none text-reset fs-4"
          onClick={enableUseSameTags}
        >
          Enabled
        </button>
      </div>
    );
  }

function UseSameDescription() {
    return (
      <div id="use-monthly-plan-container" className="ms-5">
        <h2>Use same description</h2>
        <UseSameDescriptionToggles />
      </div>
    );
  }

  function UseSameTags() {
    return (
      <div id="use-monthly-plan-container" className="ms-5">
        <h2>Use same tags</h2>
        <UseSameTagsToggles />
      </div>
    );
  }

  function Description() {
    return (
      <div className="text-input-container w-100 ms-5 d-flex flex-column align-items-start">
        <h2>Description</h2>
        <label htmlFor="description-input"></label>
        <textarea className="form-control form-control-lg small-text-area" id="description-input"></textarea>
      </div>
    );
  }

  function NumTags() {
    return (
      <div className="text-input-container w-100 ms-5 mt-5 d-flex flex-column align-items-start">
        <h2># Tags</h2>
        <label htmlFor="num-tags-input"></label>
        <textarea className="form-control form-control-lg small-text-area" id="num-tags-input"></textarea>
      </div>
    );
  }


function Upload(props) {
  if (props === null)
    return new Error("props for Plan in client settings is null");

  if (props.channelName === null)
    return new Error("No channelName for upload section of clientSettings");

  return (
    <div>
      <GrantYoutubeAccess />
      <UseSameDescription />
      <UseSameTags />
      <Description />
      <NumTags />
      <div className="horizontal-line"></div>
      <Save component="client-settings-upload" />
    </div>
  );
}

export default Upload;
