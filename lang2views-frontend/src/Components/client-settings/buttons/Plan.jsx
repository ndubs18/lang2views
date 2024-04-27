import EstimatedPriceInput from "./EstimatedPrice";
import MonthlyPlanTogglesWithLabel from "./MonthlyPlanTogglesWithLabel";
import NumLongFormatInput from "./NumLongFormatInput";
import NumShortsInput from "./NumShortsInput";
import ProcessingAmountSlider from "./ProcessingAmountSlider";
import "../clientSettings.css";

function Plan(props) {
    if (props === null)
        return new Error("props for Plan in client settings is null");

    if (props.channelName === null)
        return new Error("No channelName for plan section of clientSettings");

    return <div><p>{props.channelName}</p><br /><MonthlyPlanTogglesWithLabel /><div id="num-long-formats-and-shorts-container"><NumLongFormatInput /><NumShortsInput /></div><ProcessingAmountSlider /><EstimatedPriceInput /></div>;
}

export default Plan;