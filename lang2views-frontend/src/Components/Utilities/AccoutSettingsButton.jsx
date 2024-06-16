import React from "react";

function AccountSettingsButton(props) {
    if (props === null)
        throw new error("props is null for component AccountSettingsButton");

    if (!props.hasOwnProperty("accountPictureAndName"))
        throw new Error("Current users account picture and name is missing for client page button");
    
    const button = <button className="account-settings-button d-flex flex-row justify-content-center border rounded bg-white">{props.accountPictureAndName}</button>

    return button;
}

export default AccountSettingsButton;