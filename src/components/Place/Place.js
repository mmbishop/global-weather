import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import PlaceName from "../PlaceName";
import Conditions from "../Conditions";
import PlaceRemoveButton from "../PlaceRemoveButton";
import Temperature from "../Temperature";
import { convertTemperature } from "../../services/weather";

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

const Place = ({name, adminLevel1, country, temperature, conditions, humidity, windDirection, windSpeed, displayUnits, onPlaceRemoved}) => {
    const [showButton, setShowButton] = useState(false);
    const roundedTemperature = Math.round(temperature);
    const roundedWindSpeed = Math.round(windSpeed);
    return (
        <Col md={6} className={getBackgroundColor(roundedTemperature, displayUnits)} onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)}>
            <PlaceName name={name} adminLevel1={adminLevel1} country={country}/>
            <Temperature value={roundedTemperature} displayUnits={displayUnits}/>
            <Conditions conditions={conditions} humidity={humidity} windDirection={windDirection} windSpeed={roundedWindSpeed} displayUnits={displayUnits}/>
            {showButton && (
                <PlaceRemoveButton onPlaceRemoved={() => onPlaceRemoved(name, adminLevel1, country)}/>
            )}
        </Col>
    );
};

export default Place;
