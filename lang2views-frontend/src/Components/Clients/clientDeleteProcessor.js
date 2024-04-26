function clientDeleteProcessor(props) {
    if (props === null)
        throw new Error("props for function clientDeleteProcessor is null");

    if (!props.hasOwnProperty("target"))
        throw new Error("props does not have property target for function clientDeleteProcessor");

    if (props.target === null)
        throw new Error("props.target for function clientDeleteProcessor is null");

    if (props.target.id === undefined)
        throw new Error("props.target does not have property id for function clientDeleteProcessor");

    console.log(props.target.id);
}

export default clientDeleteProcessor;