import "../clientSettings.css";
import Save from "./PlanStepSave";
import { useState, useEffect } from "react";

function Plan({ channelId }) {
    const [plan, setPlan] = useState({});
  
    useEffect(() => {
        fetch("http://localhost:3000/client/getSettings?channelId=" + channelId, {
        method: "GET",
        }).then((response) => response.json().then((value) => setPlan(value)));
    }, [])

    return (
        <div>
            {/* 
            <UseMonthlyPlanContext.Provider value={plan.monthlyPlanInput}>
                <MonthlyPlanTogglesWithLabel />
            </UseMonthlyPlanContext.Provider>
            */}
        <div id="num-long-formats-and-shorts-container" className="ms-5 mb-5">
                <div className="text-input-container">
                    <p>Shorts</p>
                    <label htmlFor={`num-long-format-input`}></label>
                    <input
                        className="form-control form-control-lg"
                        id={`num-long-format-input`}
                        defaultValue={plan.numLongFormatInput}
                        type="number"
                    />
                </div>
                <div className="text-input-container">
                    <p>Long Formats</p>
                    <label htmlFor={`num-long-format-input`}></label>
                    <input
                        className="form-control form-control-lg"
                        id={`num-short-format-input`}
                        defaultValue={plan.numShortsInput}
                        type="number"
                    />
                </div>
        </div>
        {/* 
            <ProcessingAmountSlider levelOfPostProcessing={plan.levelOfPostProcessing}/>
        */}
        <div className="text-input-container ms-5 mt-4">
            <p>Trello List ID</p>
            <label htmlFor="trello-list-id-input"></label>
            <input
                className="form-control form-control-lg"
                id="trello-list-id-input"
                defaultValue={plan.trelloListId}
            ></input>
        </div>
        {/*<div className="text-input-container ms-5 mt-4">
            <p>Estimated Price</p>
            <label htmlFor="estimated-price-input"></label>
            <input
                className="form-control form-control-lg"
                id="estimated-price-input"
                placeholder="$"
                defaultValue={plan.estimatedPriceInput}
                type="number"
            ></input>
        </div>*/}
        <div className="horizontal-line"></div>
        <Save channelId={channelId} plan={plan}/>
    </div>
    );
}

export default Plan;
