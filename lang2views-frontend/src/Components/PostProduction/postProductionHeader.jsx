function PostProductionHeader(props) {
    if (props === null)
        return new Error("No props for post production header");

    return <><p className="fs-4">{props.sampleVideoName}</p><p className="fs-4">Post Production</p></>;
}

export default PostProductionHeader;