import React from "react";
import { createRoot } from "react-dom/client";

function AddClientButton() {
    return (
        <a href="/add" className="btn btn-primary" id="add-client-button">
            + Add new
        </a>
    );
}

export default AddClientButton;