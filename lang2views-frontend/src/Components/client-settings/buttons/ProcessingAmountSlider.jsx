import "../clientSettings.css";

function ProcessingAmountSlider() {
  return (
    <div id="processing-amount-slider-container" className="ms-5 d-flex flex-row justify-content-between">
        <div>
            <h2>Level of Post-Production</h2>
        </div>
      <div className="d-flex flex-column align-items-start" id="slider-with-labels-container">
        <div className="d-flex flex-row justify-content-between w-100">
            <div className="bg-dark slider-label-spot">
                <p className="text text-light mb-1">None</p>
            </div>
            <div className="bg-dark slider-label-spot">
                <p className="text text-light mb-1">Medium</p>
            </div>
            <div className="bg-dark slider-label-spot">
                <p className="text text-light mb-1">High</p>
            </div>
        </div>
        <input
            aria-label="Level of Post-Production"
            type="range"
            className="py-0 w-100 slider"
            min={1}
            max={3}
        ></input>
      </div>
    </div>
  );
}

export default ProcessingAmountSlider;
