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

export const convertTemperature = (temperature, fromDisplayUnits, toDisplayUnits) => {
    if (fromDisplayUnits === "imperial" && toDisplayUnits === "metric") {
        return (temperature - 32.0) * (5.0 / 9.0);
    }
    else if (fromDisplayUnits === "metric" && toDisplayUnits === "imperial") {
        return (temperature * 1.8) + 32.0;
    }
    return temperature;
}

export const convertSpeed = (speed, fromDisplayUnits, toDisplayUnits) => {
    if (fromDisplayUnits === "imperial" && toDisplayUnits === "metric") {
        return speed * 1.6;
    }
    else if (fromDisplayUnits === "metric" && toDisplayUnits === "imperial") {
        return speed / 1.6;
    }
    return speed;
}
