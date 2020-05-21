import React from "react";
import {getDirectionString} from "../../services/ui";

const Conditions = ({className = "details", feelsLike, humidity, windDirection, windSpeed, displayUnits}) => {
    return (
        <div className={className}>
            { feelsLike !== undefined && !isNaN(feelsLike) ?
                <span>Feels like: {feelsLike}°{displayUnits === "metric" ? "C" : "F"}&nbsp;&nbsp;Humidity: {humidity}%&nbsp;&nbsp;Wind: {getDirectionString(windDirection)} at {windSpeed} {displayUnits === "metric" ? "kph" : "mph"}</span>
                : <span>Humidity: {humidity}%&nbsp;&nbsp;Wind: {getDirectionString(windDirection)} at {windSpeed} {displayUnits === "metric" ? "kph" : "mph"}</span>
            }
        </div>
    );
}

export default Conditions;