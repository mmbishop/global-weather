export const getWeatherMapTileUrl = () => {
    return `https://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;
}

export const getWeatherMapAttribution = () => {
    return "&copy; OpenWeatherMap";
}