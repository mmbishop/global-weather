const convertTemperature = (temperature, displayUnits) => {
    if (displayUnits === "metric") {
        return (temperature - 32.0) * (5.0 / 9.0);
    }
    return temperature;
}

const convertSpeed = (speed, displayUnits) => {
    if (displayUnits === "metric") {
        return speed * 1.6;
    }
    return speed;
}

export default (lat, lng, displayUnits) => (
    window.fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&APPID=4a072a2d89070b207876f6f8a46ed21f`)
        .then(res => res.json())
        .then((owmResult) => {
            console.log(`lat = ${lat}, lng = ${lng}, temp = ${owmResult.main.temp}`);
            const temperature = Math.round(convertTemperature(owmResult.main.temp, displayUnits));
            const humidity = owmResult.main.humidity;
            const windDirection = owmResult.wind.deg;
            const windSpeed = Math.round(convertSpeed(owmResult.wind.speed, displayUnits));
            const conditions = owmResult.weather[0].main;
            return ({
                temperature,
                humidity,
                windDirection: windDirection,
                windSpeed: windSpeed,
                conditions: conditions
            });
        }));



