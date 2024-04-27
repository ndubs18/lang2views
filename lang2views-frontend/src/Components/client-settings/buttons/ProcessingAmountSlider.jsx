import "../clientSettings.css";

function ProcessingAmountSlider() {
    return <div id="processing-amount-slider-container"><h2>Level of Post-Production</h2><input aria-label="Level of Post-Production" type="range" className="py-0" min={1} max={3}></input></div>
}

export default ProcessingAmountSlider;