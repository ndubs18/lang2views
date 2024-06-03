import { useContext } from "react";
import { clientIdContext } from "../../Clients/clientIdContext";
import "./save.css";

function handleSubmit(clientId, plan) {
  let sliderValue = "no processing";

  const monthlyPlan = document.querySelector(".monthly-plan-section-value");
  const numLongFormatInput = document.querySelector("#num-long-format-input");
  const numShortsInput = document.querySelector("#num-shorts-input");
  const slider = document.querySelector(".slider");
  const estimatedPriceInput = document.querySelector("#estimated-price-input");
  const trelloListIdInput = document.querySelector("#trello-list-id-input");

  let monthlyPlanInput = monthlyPlan.textContent;

  if (monthlyPlan.textContent === "") monthlyPlanInput = "enable monthly plan";

  if (slider.value === "1") {
    sliderValue = "no processing";
  } else if (slider.value === "2") {
    sliderValue = "medium processing";
  } else if (slider.value === "3") {
    sliderValue = "high processing";
  }

  const updatedClientSettings = {
    monthlyPlanInput: monthlyPlanInput,
    numLongFormatInput: numLongFormatInput.value,
    numShortsInput: numShortsInput.value,
    levelOfPostProcessing: sliderValue,
    estimatedPriceInput: estimatedPriceInput.value,
    tags: plan.tags,
    youtubeAccessSectionValue: plan.youtubeAccessSectionValue,
    useSameDescriptionSectionValue: plan.useSameDescriptionSectionValue,
    useSameTagsSectionValue: plan.useSameTagsSectionValue,
    description: plan.description,
    trelloListId: trelloListIdInput.value,
  };

  fetch("http://localhost:3000/client/updateSettings", {
    method: "POST",
    body: {
      settings: updatedClientSettings,
      clientId: clientId,
    },
  })
    .then((response) => response.json())
    .then((value) => console.log(value));
}

function Save(props) {
  return (
    <button
      id="save"
      className="btn btn-primary"
      onClick={() => {
        handleSubmit(props.clientId, props.plan);
      }}
    >
      Save
    </button>
  );
}

export default Save;
