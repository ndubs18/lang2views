import "../clientSettings.css";

function MonthlyPlanTogglesWithLabel() {
    return <div id="use-monthly-plan-container"><h2>Monthly Plan</h2><Toggles /></div>;
}

function Toggles() {
    return <div><button>Disabled</button><button>Enabled</button></div>;
}

export default MonthlyPlanTogglesWithLabel;