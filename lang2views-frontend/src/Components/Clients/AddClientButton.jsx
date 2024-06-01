import React from "react";
import {createRoot} from "react-dom/client";
import AddClient from "./AddClient";

function addClientButtonClick() {
    const root = document.querySelector("#root");
    const addClientHook = createRoot(root);

    window.history.replaceState({}, "add", "/add");
    addClientHook.render(<AddClient />);
}

function AddClientButton() {
    return <button className="btn btn-primary" id="add-client-button" value="+ Add new" onClick={addClientButtonClick}>+ Add new</button>
}

export default AddClientButton;