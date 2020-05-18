import { convertTemperature } from './converters';
import { convertSpeed } from './converters';

const getCurrentDate = () => {
    return new Date();
}

export default (lat, lng, displayUnits) => (
    window.fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&APPID=4a072a2d89070b207876f6f8a46ed21f`)
        .then(res => res.json())
        .then((owmResult) => {
            console.log(`${getCurrentDate()}: lat = ${lat}, lng = ${lng}, temp = ${owmResult.main.temp}`);
            const temperature = convertTemperature(owmResult.main.temp, "imperial", displayUnits);
            const humidity = owmResult.main.humidity;
            const windDirection = owmResult.wind.deg;
            const windSpeed = convertSpeed(owmResult.wind.speed, "imperial", displayUnits);
            const conditions = owmResult.weather[0].main;
            return ({
                temperature,
                humidity,
                windDirection: windDirection,
                windSpeed: windSpeed,
                conditions: conditions
            });
        }));



