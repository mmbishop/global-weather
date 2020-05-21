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
            const windDirection = owmResult.wind.deg;
            const windSpeed = convertSpeed(owmResult.wind.speed, "imperial", displayUnits);
            const conditions = owmResult.weather[0].description;
            const icon = owmResult.weather[0].icon;
            return ({
                temperature: temperature,
                feelsLike: feelsLike,
                humidity: humidity,
                windDirection: windDirection,
                windSpeed: windSpeed,
                conditions: conditions,
                icon: icon
            });
        })
);



