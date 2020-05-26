export default (lat, lng) => (
    window.fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&APPID=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
        .then(res => res.json)
);