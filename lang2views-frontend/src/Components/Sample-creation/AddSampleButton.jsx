import React from "react";

function AddSampleButton() {
    return React.createElement("input", {value: "+ Add sample", type: "button", className: "btn btn-primary", id: "add-sample-button"});
}

export default AddSampleButton;