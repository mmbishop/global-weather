import React from "react";

const Temperature = ({className="weather", value, displayUnits}) => {
    return (
        <div className={className}>{value}
            <span className={"temp-unit"}>°{displayUnits === "metric" ? "C" : "F"}</span>
        </div>
    );
}

export default Temperature;