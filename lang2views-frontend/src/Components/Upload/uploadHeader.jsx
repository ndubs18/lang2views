function UploadHeader(props) {
    if (props === null)
        return new Error("No props for upload header");

    return <><p className="fs-4">{props.sampleVideoName}</p><p className="fs-4">Upload</p></>;
}

export default UploadHeader;