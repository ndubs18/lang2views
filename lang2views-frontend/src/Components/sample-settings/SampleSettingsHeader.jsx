function SampleSettingsHeader(props) {
    if (props === null)
        return new Error("No props for Sample settings header");

    return <><p className="fs-4">{props.sampleVideoName}</p><p className="fs-4">Sample Settings</p></>;
}

export default SampleSettingsHeader;