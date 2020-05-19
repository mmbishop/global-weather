import React from 'react';
import '@animated-burgers/burger-squeeze/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import './weather.css';
import WeatherUI from "./components/WeatherUI";

function App() {
  return (
    <div className="App">
        <WeatherUI/>
    </div>
  );
}

export default App;
