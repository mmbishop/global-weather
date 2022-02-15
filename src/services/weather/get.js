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

import { convertTemperature } from './converters';
import { convertSpeed } from './converters';

const getCurrentDate = () => {
    return new Date();
}

export default (lat, lng, displayUnits) => (
    window.fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&APPID=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
        .then(res => res.json())
        .then((owmResult) => {
            console.log(`${getCurrentDate()}: lat = ${lat}, lng = ${lng}, temp = ${owmResult.main.temp}`);
            const temperature = convertTemperature(owmResult.main.temp, "imperial", displayUnits);
            const feelsLike = convertTemperature(owmResult.main.feels_like, "imperial", displayUnits);
            const humidity = owmResult.main.humidity;
            const pressure = owmResult.main.pressure;
            const windDirection = owmResult.wind.deg;
            const windSpeed = convertSpeed(owmResult.wind.speed, "imperial", displayUnits);
            const conditions = owmResult.weather[0].description;
            const icon = owmResult.weather[0].icon;
            const localTimezoneOffset = new Date().getTimezoneOffset() * 60;
            const sunrise = new Date((owmResult.sys.sunrise + owmResult.timezone + localTimezoneOffset) * 1000);
            const sunset = new Date((owmResult.sys.sunset + owmResult.timezone + localTimezoneOffset) * 1000);
            return ({
                temperature: temperature,
                feelsLike: feelsLike,
                humidity: humidity,
                pressure: pressure,
                windDirection: windDirection,
                windSpeed: windSpeed,
                conditions: conditions,
                icon: icon,
                sunrise: sunrise,
                sunset: sunset
            });
        })
);



