import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import ClientAndSampleCreationViews from "../../Pages/clientAndSampleCreationViews";

function saveButtonClick() {
  const channelNameInput = document.querySelector("#channelName");
  const channelUrlInput = document.querySelector("#channelUrl");

  fetch("http://localhost:3000/client/add", {
    method: "POST",
    body: {
      url: channelUrlInput.textContent,
    },
  })
    .then((response) => response.json())
    .then((value) => console.log(value));

  const root = document.querySelector("#root");
  const addClientHook = createRoot(root);

  addClientHook.render(<ClientAndSampleCreationViews />);
}

function SaveClient() {
  return (
    <div className="d-flex flex-row justify-content-center">
      <button className="btn btn-primary" onClick={saveButtonClick}>
        Add client
      </button>
    </div>
  );
}

function AddClient() {
  return (
    <div className="d-flex flex-row justify-content-center mt-5">
      <div>
        <div className="mb-4">
          <h2>Channel name</h2>
          <input className="form-control" id="channelName" />
        </div>
        <div className="mb-4">
          <h2>Channel url</h2>
          <input className="form-control" id="channelUrl" />
        </div>
        <SaveClient />
      </div>
    </div>
  );
}

export default AddClient;
