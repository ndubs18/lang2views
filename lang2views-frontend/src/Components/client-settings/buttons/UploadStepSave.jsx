import { useContext } from "react";
import { currentClientSettingsContext } from "../currentClientSettings";
import "./save.css";
import { clientIdContext } from "../../Clients/clientIdContext";

function handleSubmit(clientId, currentClientSettings) {
  const youtubeAccessSectionValueContainer = document.querySelector(
    ".grant-youtube-access-section-value"
  );
  const useSameDescriptionSectionValueContainer = document.querySelector(
    ".use-same-description-section-value"
  );
  const useSameTagsSectionValueContainer = document.querySelector(
    ".use-same-tags-section-value"
  );
  const description = document.querySelector("#description-input");
  const tags = document.querySelector("#num-tags-input");

  let youtubeAccessSectionValue =
    youtubeAccessSectionValueContainer.textContent;
  if (youtubeAccessSectionValueContainer.textContent === "")
    youtubeAccessSectionValue = "grant youtube access";

  let useSameDescriptionSectionValue =
    useSameDescriptionSectionValueContainer.textContent;
  if (useSameDescriptionSectionValueContainer.textContent === "")
    useSameDescriptionSectionValue = "do not use same description";

  let useSameTagsSectionValue = useSameTagsSectionValueContainer.textContent;
  if (useSameTagsSectionValueContainer.textContent === "")
    useSameTagsSectionValue = "do not use same tags";

  const updatedClientSettings = {
    monthlyPlanInput: currentClientSettings.monthlyPlanInput,
    numLongFormatInput: currentClientSettings.numLongFormatInput,
    numShortsInput: currentClientSettings.numShortsInput,
    levelOfPostProcessing: currentClientSettings.levelOfPostProcessing,
    estimatedPriceInput: currentClientSettings.estimatedPriceInput,
    tags: tags.value,
    youtubeAccessSectionValue: youtubeAccessSectionValue,
    useSameDescriptionSectionValue: useSameDescriptionSectionValue,
    useSameTagsSectionValue: useSameTagsSectionValue,
    description: description.value,
    trelloListId: currentClientSettings.trelloListId,
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
        handleSubmit(props.clientId, props.currentClientSettings);
      }}
    >
      Save
    </button>
  );
}

export default Save;
