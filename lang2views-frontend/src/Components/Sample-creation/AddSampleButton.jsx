import React from "react";
import { createRoot } from "react-dom/client";

function AddSampleButton() {
    return (
        <a href="/addSample" className="btn btn-primary" id="add-sample-button">
            + Add Sample
        </a>
    );
}

export default AddSampleButton;