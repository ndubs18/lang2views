import React from "react";
import ClientsView from "../Clients/ClientsView";
import { createRoot } from "react-dom/client";

function renderClientsView() {
  const viewContainer = document.querySelector("#view-container");

  const clientsViewIcon = document.querySelector("#clients-view-button-icon");
  clientsViewIcon.src = "src/Images/clientActive.png";

  const sampleCreationViewIcon = document.querySelector(
    "#sample-creation-view-button-icon"
  );

  sampleCreationViewIcon.src = "src/Images/sample.png";

  if (viewContainer === null)
    throw new Error(
      "Cannot display the clients view if the view container is null, the clients view is supposed to be rendered on the same page"
    );

  const viewContainerHook = createRoot(viewContainer);

  const accountNameContainer = document.querySelector("#account-name");

  viewContainerHook.render(<ClientsView currentUser={"Alexander"} />);
}

function ClientsViewButton(props) {
  
    if (props.default === "client") {
        const accountPicture = (
            <img id="clients-view-button-icon" src="src/Images/clientActive.png"></img>
        );

        return (
            <button
                onClick={renderClientsView}
                className="btn buttonActive"
                id="clients-view-button"
            >
                {accountPicture}
            </button>
        );
    }
    else {
        const accountPicture = (
            <img id="clients-view-button-icon" src="src/Images/client.png"></img>
        );

        return (
            <button
                onClick={renderClientsView}
                className="btn buttonInactive"
                id="clients-view-button"
            >
                {accountPicture}
            </button>
        );

    }
}

export default ClientsViewButton;
