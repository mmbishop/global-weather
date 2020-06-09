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

export const getDirectionString = (degrees) => {
    if (degrees >= 348.75 || degrees < 11.25) {
        return "N";
    }
    else if (degrees >= 11.25 && degrees < 33.75) {
        return "NNE";
    }
    else if (degrees >= 33.75 && degrees < 56.25) {
        return "NE";
    }
    else if (degrees >= 56.25 && degrees < 78.75) {
        return "ENE";
    }
    else if (degrees >= 78.75 && degrees < 101.25) {
        return "E";
    }
    else if (degrees >= 101.25 && degrees < 123.75) {
        return "ESE";
    }
    else if (degrees >= 123.75 && degrees < 146.25) {
        return "SE";
    }
    else if (degrees >= 146.25 && degrees < 168.75) {
        return "SSE";
    }
    else if (degrees >= 168.75 && degrees < 191.25) {
        return "S";
    }
    else if (degrees >= 191.25 && degrees < 213.75) {
        return "SSW";
    }
    else if (degrees >= 213.75 && degrees < 236.25) {
        return "SW";
    }
    else if (degrees >= 236.25 && degrees < 258.75) {
        return "WSW";
    }
    else if (degrees >= 258.75 && degrees < 281.25) {
        return "W";
    }
    else if (degrees >= 281.25 && degrees < 303.75) {
        return "WNW";
    }
    else if (degrees >= 303.75 && degrees < 326.25) {
        return "NW";
    }
    else if (degrees >= 326.25 && degrees < 348.75) {
        return "NNW";
    }
    return degrees;
}

export default getDirectionString;