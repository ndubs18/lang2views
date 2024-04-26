function clientVideoListProcessor(props) {
    if (props === null)
        throw new Error("props for function clientVideoListProcessor is null");

    if (!props.hasOwnProperty("target"))
        throw new Error("props does not have property target for function clientVideoListProcessor");

    if (props.target === null)
        throw new Error("props.target for function clientVideoListProcessor is null");

    if (props.target.id === undefined)
        throw new Error("props.target does not have property id for function clientVideoListProcessor");

    console.log(props.target.id);
}

export default clientVideoListProcessor;