import EstimatedPriceInput from "./EstimatedPrice";
import MonthlyPlanTogglesWithLabel from "./MonthlyPlanTogglesWithLabel";
import NumLongFormatInput from "./NumLongFormatInput";
import NumShortsInput from "./NumShortsInput";
import ProcessingAmountSlider from "./ProcessingAmountSlider";
import "../clientSettings.css";
import Save from "./Save";

function Plan() {
  return (
    <div>
      <MonthlyPlanTogglesWithLabel />
      <div id="num-long-formats-and-shorts-container" className="ms-5">
            <NumLongFormatInput />
            <NumShortsInput />
      </div>
      <ProcessingAmountSlider />
      <EstimatedPriceInput />
      <div className="horizontal-line"></div>
      <Save component="client-settings-plan" />
    </div>
  );
}

export default Plan;
