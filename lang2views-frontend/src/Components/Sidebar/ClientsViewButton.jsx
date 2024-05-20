import React from "react";
import ClientsView from "../Clients/ClientsView";
import { createRoot } from "react-dom/client";

function renderClientsView() {
  const viewContainer = document.querySelector("#view-container");

  const clientsViewButton = document.querySelector("#clients-view-button");
  clientsViewButton.classList.add("bg-primary");

  const sampleCreationViewButton = document.querySelector(
    "#sample-creation-view-button"
  );

  if (sampleCreationViewButton.classList.contains("bg-primary"))
    sampleCreationViewButton.classList.remove("bg-primary");

  if (viewContainer === null)
    throw new Error(
      "Cannot display the clients view if the view container is null, the clients view is supposed to be rendered on the same page"
    );

  const viewContainerHook = createRoot(viewContainer);

  const accountNameContainer = document.querySelector("#account-name");

  viewContainerHook.render(<ClientsView currentUser={"Alexander"} />);
}

function ClientsViewButton() {
  const accountPicture = (
        <img id="clients-view-button-icon" src="src/Images/client.png"></img>
  );

  return (
    <button
      onClick={renderClientsView}
      className="btn"
      id="clients-view-button"
    >
      {accountPicture}
    </button>
  );
}

export default ClientsViewButton;
