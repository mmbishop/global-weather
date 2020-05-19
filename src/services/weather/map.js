export const getWeatherMap = (lat, lng) => {
    window.fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&APPID=4a072a2d89070b207876f6f8a46ed21f`)
}