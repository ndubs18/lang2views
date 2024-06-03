import "../clientSettings.css";

function NumLongFormatInput(props) {
  return (
    <div className="text-input-container">
      <h2>Long format</h2>
      <label htmlFor="num-long-format-input"></label>
      <input
        className="form-control form-control-lg"
        id="num-long-format-input"
        defaultValue={props.numLongFormatInput}
      ></input>
    </div>
  );
}

export default NumLongFormatInput;
