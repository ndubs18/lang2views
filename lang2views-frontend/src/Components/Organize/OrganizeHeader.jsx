function OrganizeHeader(props) {
    if (props === null)
        return new Error("No props for Sample settings header");

    return <><p className="fs-4">{props.sampleVideoName}</p><p className="fs-4">Organize</p></>;
}

export default OrganizeHeader;