import React from "react";

const Temperature = ({value, displayUnits}) => {
    return (
        <div className={"weather"}>{value}
            <span className={"temp-unit"}>°{displayUnits === "metric" ? "C" : "F"}</span>
        </div>
    );
}

export default Temperature;