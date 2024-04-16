import React from "react";
import ClientsView from "../Clients/ClientsView";
import { createRoot } from "react-dom/client";

function renderClientsView() {
    const viewContainer = document.querySelector("#view-container");

    if (viewContainer === null)
        throw new Error("Cannot display the clients view if the view container is null, the clients view is supposed to be rendered on the same page");
    
    const viewContainerHook = createRoot(viewContainer);

    const accountNameContainer = document.querySelector("#account-name");

    viewContainerHook.render(<ClientsView currentUser={"Alexander"}/>);
}

function ClientsViewButton() {
    const accountPicture = <img id="clients-view-button-icon" src="src/Images/brown.png"></img>;

    return <button onClick={renderClientsView} className="btn bg-secondary" id="clients-view-button">{accountPicture}</button>;
}

export default ClientsViewButton;