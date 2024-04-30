import "../clientSettings.css";

function MonthlyPlanTogglesWithLabel() {
  return (
    <div id="use-monthly-plan-container" className="ms-5">
      <h2>Monthly Plan</h2>
      <Toggles />
    </div>
  );
}

function disableMonthlyPlan() {}

function enableMonthlyPlan() {}

function Toggles() {
  return (
    <div>
      <button
        className="btn btn-link text-decoration-none text-reset fs-4"
        onClick={disableMonthlyPlan}
      >
        Disabled
      </button>
      <button
        className="btn btn-link text-decoration-none text-reset fs-4"
        onClick={enableMonthlyPlan}
      >
        Enabled
      </button>
    </div>
  );
}

export default MonthlyPlanTogglesWithLabel;
