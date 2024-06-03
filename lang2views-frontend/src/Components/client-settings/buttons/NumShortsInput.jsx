import "../clientSettings.css";

function NumShortsInput(props) {
  return (
    <div className="text-input-container">
      <h2>Shorts</h2>
      <label htmlFor="num-shorts-input"></label>
      <input
        className="form-control form-control-lg"
        id="num-shorts-input"
        defaultValue={props.numShortsInput}
      ></input>
    </div>
  );
}

export default NumShortsInput;
