function ClientPlanHeader(props) {
    if (props === null)
        return new Error("No props for Client plan header");

    return <><p className="fs-4">{props.clientName}</p><p className="fs-4">Plan</p></>;
}

export default ClientPlanHeader;