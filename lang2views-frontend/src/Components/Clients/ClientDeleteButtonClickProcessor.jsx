function ClientDeleteButtonClickProcessor(props) {
    if (props === null)
        throw new Error("props for function ClientDeleteButtonClickProcessor is null");

    if (!props.hasOwnProperty("target"))
        throw new Error("props does not have property target for function ClientDeleteButtonClickProcessor");

    if (props.target === null)
        throw new Error("props.target for function ClientDeleteButtonClickProcessor is null");

    if (props.target.id === undefined)
        throw new Error("props.target does not have property id for function ClientDeleteButtonClickProcessor");

    console.log(props.target.id);
}

export default ClientDeleteButtonClickProcessor;