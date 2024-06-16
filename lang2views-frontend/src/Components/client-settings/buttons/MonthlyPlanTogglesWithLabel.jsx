import { useContext } from "react";
import "../clientSettings.css";
import { UseMonthlyPlanContext } from "./UseMonthlyPlanContext";

const ACTIVE_BUTTON_CLASS = "monthly-plan-toggle-active";
const INACTIVE_BUTTON_CLASS = "monthly-plan-toggle-not-active";

function MonthlyPlanTogglesWithLabel() {
  const monthlyPlanContext = useContext(UseMonthlyPlanContext);

  return (
    <div id="use-monthly-plan-container" className="ms-5">
      <h2>Monthly Plan</h2>
      <Toggles />
      <div className="monthly-plan-section-value" hidden>{monthlyPlanContext ? "true" : "false"}</div>
    </div>
  );
}

function Toggles() {
    const monthlyPlanEnabled = useContext(UseMonthlyPlanContext);
    let disableButtonClass = ""
    let enableButtonClass = ""
    let isEnabled = monthlyPlanEnabled;

    if (monthlyPlanEnabled) {
        disableButtonClass = INACTIVE_BUTTON_CLASS;
        enableButtonClass = ACTIVE_BUTTON_CLASS;
    } else {
        disableButtonClass = ACTIVE_BUTTON_CLASS;
        enableButtonClass = INACTIVE_BUTTON_CLASS;
    }

    function disableMonthlyPlan() {
        if (isEnabled) {
            const sectionValue = document.querySelector(".monthly-plan-section-value");
            document.getElementById("disable-plan-button").classList.replace(INACTIVE_BUTTON_CLASS, ACTIVE_BUTTON_CLASS)
            document.getElementById("enable-plan-button").classList.replace(ACTIVE_BUTTON_CLASS, INACTIVE_BUTTON_CLASS)

            isEnabled = false;
            sectionValue.textContent = "false";
        }
    }

    function enableMonthlyPlan() {
        if (!isEnabled) {
            const sectionValue = document.querySelector(".monthly-plan-section-value");
            document.getElementById("enable-plan-button").classList.replace(INACTIVE_BUTTON_CLASS, ACTIVE_BUTTON_CLASS)
            document.getElementById("disable-plan-button").classList.replace(ACTIVE_BUTTON_CLASS, INACTIVE_BUTTON_CLASS)

            isEnabled = true;
            sectionValue.textContent = "true";
        }
    }

    return (
        <div>
            <button
            id="disable-plan-button"
            className={disableButtonClass + " btn btn-link text-decoration-none text-reset fs-4"}
            onClick={disableMonthlyPlan}
            >
            Disabled
            </button>
            <button
            id="enable-plan-button"
            className={enableButtonClass + " btn btn-link text-decoration-none text-reset fs-4"}
            onClick={enableMonthlyPlan}
            >
            Enabled
            </button>
        </div>
    );
}

export default MonthlyPlanTogglesWithLabel;
