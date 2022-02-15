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

import {convertTemperature} from "./converters";

export default (lat, lng, displayUnits) => (
    window.fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current&units=imperial&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
        .then(res => res.json())
        .then((owmResult) => {
            const appliedTimezoneOffset = owmResult.timezone_offset + (new Date().getTimezoneOffset() * 60);
            return ({
                hourlyForecast: owmResult.hourly.map(hour => {
                    return {
                        time: (hour.dt + appliedTimezoneOffset) * 1000,
                        temperature: convertTemperature(hour.temp, "imperial", displayUnits),
                        feelsLike: convertTemperature(hour.feels_like, "imperial", displayUnits),
                        humidity: hour.humidity,
                        pressure: hour.pressure,
                        windSpeed: hour.wind_speed,
                        windDirection: hour.wind_deg,
                        conditions: hour.weather[0].description,
                        icon: hour.weather[0].icon
                    };
                }),
                dailyForecast: owmResult.daily.map(day => {
                    return {
                        time: (day.dt + appliedTimezoneOffset) * 1000,
                        sunrise: new Date((day.sunrise + appliedTimezoneOffset) * 1000),
                        sunset: new Date((day.sunset + appliedTimezoneOffset) * 1000),
                        highTemperature: convertTemperature(day.temp.max, "imperial", displayUnits),
                        lowTemperature: convertTemperature(day.temp.min, "imperial", displayUnits),
                        humidity: day.humidity,
                        pressure: day.pressure,
                        windSpeed: day.wind_speed,
                        windDirection: day.wind_deg,
                        conditions: day.weather[0].description,
                        icon: day.weather[0].icon
                    };
                })
            });
        })
        .catch(err => {
            console.log(err);
        })
);
