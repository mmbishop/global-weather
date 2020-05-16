import React from "react";

const Temperature = ({value}) => {
    return (
        <div className={"weather"}>{value}
            <span className={"temp-unit"}>°F</span>
        </div>
    );
}

export default Temperature;