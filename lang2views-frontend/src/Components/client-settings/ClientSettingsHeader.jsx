function ClientSettingsHeader(props) {
    if (props === null)
        return new Error("No props for Client settings header");

    return <><p className="fs-4">{props.clientName}</p><p className="fs-4">Settings</p></>;
}

export default ClientSettingsHeader;