export class WeatherService {

    getWeather(lat, lng, placeData, weatherCallback) {
        window.fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&units=imperial&APPID=4a072a2d89070b207876f6f8a46ed21f")
            .then(res => res.json())
            .then((owmResult) => {
                const temperature = Math.round(owmResult.main.temp);
                const humidity = owmResult.main.humidity;
                const windDirection = owmResult.wind.deg;
                const windSpeed = Math.round(owmResult.wind.speed);
                const conditions = owmResult.weather[0].main;
                weatherCallback({temperature: temperature, humidity: humidity, windDirection: windDirection, windSpeed: windSpeed, conditions: conditions,
                    placeData: placeData});
            });
    }

}