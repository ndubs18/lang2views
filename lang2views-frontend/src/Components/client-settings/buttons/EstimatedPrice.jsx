import "../clientSettings.css";

function EstimatedPriceInput() {
    return <div className="text-input-container"><h2>Estimated Price</h2><label htmlFor="estimated-price-input"></label><input className="form-control form-control-lg" id="estimated-price-input" readOnly=""></input></div>
}

export default EstimatedPriceInput;