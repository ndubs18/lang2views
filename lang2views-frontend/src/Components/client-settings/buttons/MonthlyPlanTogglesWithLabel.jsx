import { useContext, useState } from "react";
import "../clientSettings.css";
import { UseMonthlyPlanContext } from "./UseMonthlyPlanContext";

function MonthlyPlanTogglesWithLabel() {
  return (
    <div id="use-monthly-plan-container" className="ms-5">
      <h2>Monthly Plan</h2>
      <Toggles />
      <div className="monthly-plan-section-value" hidden></div>
    </div>
  );
}

function disableMonthlyPlan() {
  const sectionValue = document.querySelector(".monthly-plan-section-value");

  sectionValue.textContent = "disable monthly plan";
}

function enableMonthlyPlan() {
  const sectionValue = document.querySelector(".monthly-plan-section-value");

  sectionValue.textContent = "enable monthly plan";
}

function Toggles() {
  const monthlyPlanContext = useContext(UseMonthlyPlanContext);

  const [disablePlanActive, setDisablePlanActive] = useState(monthlyPlanContext ? "monthly-plan-toggle-not-active" : "monthly-plan-toggle-active");
  const [enablePlanActive, setEnablePlanActive] = useState(monthlyPlanContext ? "monthly-plan-toggle-active" : "monthly-plan-toggle-not-active");
  
  return (
    <div>
      <button
        className={disablePlanActive + " btn btn-link text-decoration-none text-reset fs-4"}
        onClick={() => {disableMonthlyPlan(); setDisablePlanActive("monthly-plan-toggle-active"); setEnablePlanActive("monthly-plan-toggle-not-active")}}
      >
        Disabled
      </button>
      <button
        className={enablePlanActive + " btn btn-link text-decoration-none text-reset fs-4"}
        onClick={() => {enableMonthlyPlan(); setEnablePlanActive("monthly-plan-toggle-active"); setDisablePlanActive("monthly-plan-toggle-not-active")}}
      >
        Enabled
      </button>
    </div>
  );
}

export default MonthlyPlanTogglesWithLabel;
