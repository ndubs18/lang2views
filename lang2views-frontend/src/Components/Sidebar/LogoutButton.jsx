import React from "react";

function LogoutButton() {
    const accountPicture = <img id="logout-button-icon" src="src/images/logout.png"></img>
    return <button className="btn bg-white" id="logout-button">{accountPicture}</button>;
}

export default LogoutButton;