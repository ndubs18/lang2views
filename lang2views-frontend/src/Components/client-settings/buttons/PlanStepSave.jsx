import "./save.css";

function handleSubmit(channelId, plan) {
  const monthlyPlan = document.querySelector(".monthly-plan-section-value");
  const numLongFormatInput = document.querySelector("#num-long-format-input");
  const numShortsInput = document.querySelector("#num-short-format-input");
  const sliderInput = document.querySelector(".slider");
  const estimatedPriceInput = document.querySelector("#estimated-price-input");
  const trelloListIdInput = document.querySelector("#trello-list-id-input");

  let monthlyPlanInput = monthlyPlan.textContent === "true" ? true : false;

  const updatedClientSettings = {
    monthlyPlanInput: monthlyPlanInput,
    numLongFormatInput: numLongFormatInput.value,
    numShortsInput: numShortsInput.value,
    levelOfPostProcessing: sliderInput.value,
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
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        settings: updatedClientSettings,
        channelId: channelId,
        }),
    })
    .then((response) => response.json())
    .then((value) => console.log(value));
}

function Save({ channelId, plan }) {
  return (
    <button
      id="save"
      className="btn btn-primary"
      onClick={() => {
          handleSubmit(channelId, plan);
      }}
    >
      Save
    </button>
  );
}

export default Save;
