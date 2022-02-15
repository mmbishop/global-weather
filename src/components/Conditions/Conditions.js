//<editor-fold desc="Copyright (c) 2020 Michael Bishop">
// global-weather
// Copyright (c) 2020 Michael Bishop
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//</editor-fold>

import React from "react";
import {getDirectionString} from "../../services/ui";

const zeroPadded = (value) => {
    return ("" + value).padStart(2, "0");
}

const Conditions = ({className = "details", feelsLike, humidity, windDirection, windSpeed, pressure, sunrise, sunset, showSunriseAndSunset = false, displayUnits}) => {
    let sunriseString = "";
    let sunsetString = "";
    if (showSunriseAndSunset) {
        sunriseString = sunrise ? `Sunrise: ${zeroPadded(sunrise.getHours())}:${zeroPadded(sunrise.getMinutes())}:${zeroPadded(sunrise.getSeconds())}` : "N/A";
        sunsetString = sunset ? `Sunset: ${zeroPadded(sunset.getHours())}:${zeroPadded(sunset.getMinutes())}:${zeroPadded(sunset.getSeconds())}` : "N/A";
    }
    return (
        <div className={className}>
            <span>Feels like: {feelsLike}°{displayUnits === "metric" ? "C" : "F"}&nbsp;&nbsp;Humidity: {humidity}%&nbsp;&nbsp;Wind: {getDirectionString(windDirection)} at {windSpeed} {displayUnits === "metric" ? "kph" : "mph"}</span><br/>
            <span>Pressure: {pressure} mb&nbsp;&nbsp;{sunriseString}&nbsp;&nbsp;{sunsetString}</span>
        </div>
    );
}

export default Conditions;