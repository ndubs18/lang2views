import React from "react";

function LogoutButton() {
    const accountPicture = <img id="logout-button-icon" src="src/Images/brown.png"></img>
    return <button className="btn bg-secondary" id="logout-button">{accountPicture}</button>;
}

export default LogoutButton;