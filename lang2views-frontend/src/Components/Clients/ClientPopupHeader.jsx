import "./popup.css"

function ClientPopupHeader({ channelName, headerText }) {

    return <div className="client-popup-header">
        <p className="popup-header-text" style={{ textAlign: "left" }}>{channelName}</p>
        <p className="popup-header-text" style={{ textAlign: "right" }}>{headerText}</p>
    </div>;
}

export default ClientPopupHeader;