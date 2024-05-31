function saveButtonClick() {}

function SaveClient() {
  return (
    <div className="d-flex flex-row justify-content-center">
      <button className="btn btn-primary" onClick={saveButtonClick}>
        Save
      </button>
    </div>
  );
}

function AddClient() {
  return (
    <div className="d-flex flex-row justify-content-center">
      <div>
        <div className="mb-4">
          <h2>Channel name</h2>
          <input id="channelName" />
        </div>
        <div className="mb-4">
          <h2>Channel url</h2>
          <input id="channelUrl" />
        </div>
        <SaveClient />
      </div>
    </div>
  );
}

export default AddClient;
