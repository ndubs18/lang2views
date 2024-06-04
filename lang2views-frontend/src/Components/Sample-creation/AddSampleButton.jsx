import React from "react";
import { createRoot } from "react-dom/client";
import AddSample from "./AddSample";

function addSampleButtonClick() {
    const root = document.querySelector("#root");
    const addSampleHook = createRoot(root);

    window.history.replaceState({}, "addSample", "/addSample");
    addSampleHook.render(<AddSample />);
}

function AddSampleButton() {
    return <button className="btn btn-primary" id="add-sample-button" onClick={addSampleButtonClick}>+ Add Sample</button>
}

export default AddSampleButton;