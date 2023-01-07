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

import {convertTemperature} from "../weather";

export const getPlaceTileClassName = (currentTemp, displayUnits) => {
    let temp = currentTemp;
    if (displayUnits === "metric") {
        temp = convertTemperature(currentTemp, "metric", "imperial");
    }
    let className = 'undefined-temp';
    let roundedTemp = Math.round(temp);
    if (roundedTemp >= 90.0) {
        className = "hot";
    }
    else if (roundedTemp >= 70.0 && roundedTemp < 90.0) {
        className = "warm";
    }
    else if (roundedTemp >= 40.0 && roundedTemp < 70.0) {
        className = "cool";
    }
    else if (roundedTemp >= 0.0 && roundedTemp < 40.0) {
        className = "cold";
    }
    else if (roundedTemp < 0.0) {
        className = "frigid";
    }
    return className;
}

export default getPlaceTileClassName;
