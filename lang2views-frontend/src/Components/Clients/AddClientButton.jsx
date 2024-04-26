import React from "react";

function AddClientButton() {
    return React.createElement("input", {value: "+ Add new", type: "button", className: "btn btn-primary", id: "add-client-button"});
}

export default AddClientButton;