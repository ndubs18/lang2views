import EstimatedPriceInput from "./EstimatedPrice";
import MonthlyPlanTogglesWithLabel from "./MonthlyPlanTogglesWithLabel";
import NumLongFormatInput from "./NumLongFormatInput";
import NumShortsInput from "./NumShortsInput";
import ProcessingAmountSlider from "./ProcessingAmountSlider";
import "../clientSettings.css";
import Save from "./PlanStepSave";
import { useState, createContext, useEffect } from "react";
import { UseMonthlyPlanContext } from "./UseMonthlyPlanContext";

function Plan() {
  const [plan, setPlan] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/client/updateSettings", {
    method: "GET",
  }).then((response) => response.json().then((value) => setPlan(value)));
  }, [])

  return (
    <div>
      <UseMonthlyPlanContext.Provider value={value.monthlyPlanInput}>
        <MonthlyPlanTogglesWithLabel />
      </UseMonthlyPlanContext.Provider>
      <div id="num-long-formats-and-shorts-container" className="ms-5 mb-5">
        <NumLongFormatInput props={plan.numLongFormatInput}/>
        <NumShortsInput props={plan.numShortsInput}/>
      </div>
      <ProcessingAmountSlider props={plan.levelOfPostProcessing}/>
      <EstimatedPriceInput props={plan.estimatedPriceInput}/>
      <div className="horizontal-line"></div>
      <Save />
    </div>
  );
}

export default Plan;
