export default (lat, lng) => (
    window.fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current&units=imperial&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
        .then(res => res.json())
        .then((owmResult) => {
            const appliedTimezoneOffset = owmResult.timezone_offset + (new Date().getTimezoneOffset() * 60);
            return ({
                hourlyForecast: owmResult.hourly.map(hour => {
                    return {
                        time: (hour.dt + appliedTimezoneOffset) * 1000,
                        temperature: hour.temp,
                        feelsLike: hour.feels_like,
                        humidity: hour.humidity,
                        windSpeed: hour.wind_speed,
                        windDirection: hour.wind_deg,
                        conditions: hour.weather[0].main,
                        icon: hour.weather[0].icon
                    };
                }),
                dailyForecast: owmResult.daily.map(day => {
                    return {
                        time: (day.dt + appliedTimezoneOffset) * 1000,
                        sunrise: (day.sunrise + appliedTimezoneOffset) * 1000,
                        sunset: (day.sunset + appliedTimezoneOffset) * 1000,
                        highTemperature: day.temp.max,
                        lowTemperature: day.temp.min,
                        humidity: day.humidity,
                        windSpeed: day.wind_speed,
                        windDirection: day.wind_deg,
                        conditions: day.weather[0].main,
                        icon: day.weather[0].icon
                    };
                })
            });
        })
        .catch(err => {
            console.log(err);
        })
);
