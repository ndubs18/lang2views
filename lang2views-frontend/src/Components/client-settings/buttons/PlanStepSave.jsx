import "./save.css";

function handleSubmit() {
  let sliderValue = "no processing";

  const monthlyPlan = document.querySelector(".monthly-plan-section-value");
  const numLongFormatInput = document.querySelector("#num-long-format-input");
  const numShortsInput = document.querySelector("#num-shorts-input");
  const slider = document.querySelector(".slider");
  const estimatedPriceInput = document.querySelector("#estimated-price-input");

  let monthlyPlanInput = monthlyPlan.textContent;

  if (monthlyPlan.textContent === "")
    monthlyPlanInput = "enable monthly plan";
  
  console.log(monthlyPlanInput);
  console.log(numLongFormatInput.value);
  console.log(numShortsInput.value);

  if (slider.value === "1") {
    sliderValue = "no processing";
  }
  else if (slider.value === "2") {
    sliderValue = "medium processing";
  }
  else if (slider.value === "3") {
    sliderValue = "high processing";
  }

  console.log(sliderValue);
  console.log(estimatedPriceInput.value);
}

function Save() {
  return (
    <button
      id="save"
      className="btn btn-primary"
      onClick={handleSubmit}
    >
      Save
    </button>
  );
}

export default Save;
