import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import PlaceName from "../PlaceName";
import Conditions from "../Conditions";
import PlaceRemoveButton from "../PlaceRemoveButton";
import Temperature from "../Temperature";
import WeatherMenu from "../WeatherMenu/WeatherMenu";
import WeatherIcon from "../WeatherIcon";
import {getBackgroundColor} from "../../services/ui";

const Place = ({name, adminLevel1, country, weatherData, displayUnits, onPlaceRemoved, onForecastRequested, onWeatherMapRequested}) => {
    const [hasFocus, setHasFocus] = useState(false);
    const roundedTemperature = Math.round(weatherData.temperature);
    const roundedFeelsLike = Math.round(weatherData.feelsLike);
    const roundedWindSpeed = Math.round(weatherData.windSpeed);

    return (
        <Col md={6} className={getBackgroundColor(roundedTemperature, displayUnits)}
             onMouseEnter={() => setHasFocus(true)}
             onMouseLeave={() => setHasFocus(false)}>
            <PlaceName name={name} adminLevel1={adminLevel1} country={country}/>
            <Temperature value={roundedTemperature} displayUnits={displayUnits}/>
            <Conditions feelsLike={roundedFeelsLike} humidity={weatherData.humidity} windDirection={weatherData.windDirection} windSpeed={roundedWindSpeed} displayUnits={displayUnits}/>
            {weatherData.icon !== undefined && (
                <WeatherIcon icon={weatherData.icon} description={weatherData.conditions}/>
            )}
            {hasFocus && (
                <WeatherMenu onForecastRequested={() => onForecastRequested(name, adminLevel1, country)}
                             onMapRequested={() => onWeatherMapRequested(name, adminLevel1, country)}/>
            )}
            {hasFocus && (
                <PlaceRemoveButton onPlaceRemoved={() => onPlaceRemoved(name, adminLevel1, country)}/>
            )}
        </Col>
    );
};

export default Place;
