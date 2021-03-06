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