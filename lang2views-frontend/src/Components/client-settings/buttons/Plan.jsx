import EstimatedPriceInput from "./EstimatedPrice";
import MonthlyPlanTogglesWithLabel from "./MonthlyPlanTogglesWithLabel";
import NumLongFormatInput from "./NumLongFormatInput";
import NumShortsInput from "./NumShortsInput";
import ProcessingAmountSlider from "./ProcessingAmountSlider";
import "../clientSettings.css";
import Save from "./PlanStepSave";
import { useState, createContext, useEffect, useContext } from "react";
import { UseMonthlyPlanContext } from "./UseMonthlyPlanContext";
import TrelloListId from "./trelloListId";
import { clientIdContext } from "../../Clients/clientIdContext";
import { channelIdContext } from "../../Clients/channelIdContext";

function Plan() {
  const [plan, setPlan] = useState({});
  
  useEffect(() => {
    fetch("http://localhost:3000/client/getSettings?channelId=" + channelIdContext.Provider, {
    method: "GET",
  }).then((response) => response.json().then((value) => setPlan(value)));
  }, [])

  /*plan.monthlyPlanInput = true;
  plan.numLongFormatInput = 1;
  plan.numShortsInput = 1;
  plan.levelOfPostProcessing = 2;
  plan.trelloListId = 1;
  plan.estimatedPriceInput = 2;
  */

  return (
    <div>
      <UseMonthlyPlanContext.Provider value={plan.monthlyPlanInput}>
        <MonthlyPlanTogglesWithLabel />
      </UseMonthlyPlanContext.Provider>
      <div id="num-long-formats-and-shorts-container" className="ms-5 mb-5">
        <NumLongFormatInput numLongFormatInput={plan.numLongFormatInput}/>
        <NumShortsInput numShortsInput={plan.numShortsInput}/>
      </div>
      <ProcessingAmountSlider levelOfPostProcessing={plan.levelOfPostProcessing}/>
      <TrelloListId trelloListId={plan.trelloListId}/>
      <EstimatedPriceInput estimatedPriceInput={plan.estimatedPriceInput}/>
      <div className="horizontal-line"></div>
      <Save clientId={clientIdContext.Provider} plan={plan}/>
    </div>
  );
}

export default Plan;
