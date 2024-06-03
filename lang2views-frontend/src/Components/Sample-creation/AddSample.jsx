import { createRoot } from "react-dom/client";
import { SampleAndClientCreationViews } from "../../Pages/clientAndSampleCreationViews";

function saveSampleButtonClick() {
    const sampleuUrlInput = document.querySelector("#sampleUrl");

    console.log(sampleuUrlInput.value + '\n');

    const root = document.querySelector("#root");
    const addSampleHook = createRoot(root);

    addSampleHook.render(<SampleAndClientCreationViews />);
}


function SaveSample() {
  return (
    <div className="d-flex flex-row justify-content-center">
      <button className="btn btn-primary" onClick={saveSampleButtonClick}>
        Add Sample
      </button>
    </div>
  );
}

function AddSample() {
  return (
    <div className="d-flex flex-row justify-content-center mt-5">
      <div>
        <div className="mb-4">
          <h2>Sample url</h2>
          <input className="form-control" id="sampleUrl" />
        </div>
        <SaveSample />
      </div>
    </div>
  );
}


export default AddSample
