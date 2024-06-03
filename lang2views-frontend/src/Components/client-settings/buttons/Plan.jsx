import EstimatedPriceInput from "./EstimatedPrice";
import MonthlyPlanTogglesWithLabel from "./MonthlyPlanTogglesWithLabel";
import NumFormatInput from "./NumFormatInput";
import ProcessingAmountSlider from "./ProcessingAmountSlider";
import "../clientSettings.css";
import Save from "./PlanStepSave";
import { useState, useEffect } from "react";
import { UseMonthlyPlanContext } from "./UseMonthlyPlanContext";
import TrelloListId from "./trelloListId";

function Plan({ channelId }) {
  const [plan, setPlan] = useState({});
  
  useEffect(() => {
    fetch("http://localhost:3000/client/getSettings?channelId=" + channelId, {
    method: "GET",
  }).then((response) => response.json().then((value) => setPlan(value)));
  }, [])

  return (
    <div>
      <UseMonthlyPlanContext.Provider value={plan.monthlyPlanInput}>
        <MonthlyPlanTogglesWithLabel />
      </UseMonthlyPlanContext.Provider>
      <div id="num-long-formats-and-shorts-container" className="ms-5 mb-5">
        <NumFormatInput format={"long"} value={plan.numLongFormatInput}/>
        <NumFormatInput format={"short"} value={plan.numShortsInput}/>
      </div>
      <ProcessingAmountSlider levelOfPostProcessing={plan.levelOfPostProcessing}/>
      <TrelloListId trelloListId={plan.trelloListId}/>
      <EstimatedPriceInput estimatedPriceInput={plan.estimatedPriceInput}/>
      <div className="horizontal-line"></div>
      <Save channelId={channelId} plan={plan}/>
    </div>
  );
}

export default Plan;
