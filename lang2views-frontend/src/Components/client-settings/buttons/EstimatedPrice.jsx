import "../clientSettings.css";

function EstimatedPriceInput(props) {
  return (
    <div className="text-input-container ms-5">
      <h2>Estimated Price</h2>
      <label htmlFor="estimated-price-input"></label>
      <input
        className="form-control form-control-lg"
        id="estimated-price-input"
        readOnly=""
        placeholder={"$" + props.EstimatedPriceInput}
      ></input>
    </div>
  );
}

export default EstimatedPriceInput;
