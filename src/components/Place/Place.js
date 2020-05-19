import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import PlaceName from "../PlaceName";
import Conditions from "../Conditions";
import PlaceRemoveButton from "../PlaceRemoveButton";
import Temperature from "../Temperature";
import { convertTemperature } from "../../services/weather";
import {Image, OverlayTrigger, Tooltip} from "react-bootstrap";

const getBackgroundColor = (currentTemp, displayUnits) => {
    let temp = currentTemp;
    if (displayUnits === "metric") {
        temp = convertTemperature(currentTemp, "metric", "imperial");
    }
    if (temp >= 90.0) {
        return "hot";
    }
    else if (temp >= 70.0 && temp < 90.0) {
        return "warm";
    }
    else if (temp >= 40.0 && temp < 70.0) {
        return "cool";
    }
    else if (temp >= 0.0 && temp < 40.0) {
        return "cold";
    }
    else if (temp < 0.0) {
        return "frigid";
    }
    return "undefined-temp";
}

const Place = ({name, adminLevel1, country, weatherData, displayUnits, onPlaceRemoved}) => {
    const [showButton, setShowButton] = useState(false);
    const roundedTemperature = Math.round(weatherData.temperature);
    const roundedFeelsLike = Math.round(weatherData.feelsLike);
    const roundedWindSpeed = Math.round(weatherData.windSpeed);
    return (
        <Col md={6} className={getBackgroundColor(roundedTemperature, displayUnits)} onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)}>
            <PlaceName name={name} adminLevel1={adminLevel1} country={country}/>
            <Temperature value={roundedTemperature} displayUnits={displayUnits}/>
            <Conditions feelsLike={roundedFeelsLike} humidity={weatherData.humidity} windDirection={weatherData.windDirection} windSpeed={roundedWindSpeed} displayUnits={displayUnits}/>
            {weatherData.icon !== undefined && (
                <OverlayTrigger placement={"right"} delay={{show: 250, hide:400}} overlay={
                    <Tooltip id={"button-tooltip"}>
                        {weatherData.conditions}
                    </Tooltip>
                }>
                    <Image className={"weather-icon"} src={require(`../../images/${weatherData.icon}.png`)} alt={"Weather icon"}/>
                </OverlayTrigger>
            )}
            {showButton && (
                <PlaceRemoveButton onPlaceRemoved={() => onPlaceRemoved(name, adminLevel1, country)}/>
            )}
        </Col>
    );
};

export default Place;
