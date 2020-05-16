import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import PlaceName from "../PlaceName";
import Conditions from "../Conditions";
import PlaceRemoveButton from "../PlaceRemoveButton";
import Temperature from "../Temperature";

const getBackgroundColor = (temp) => {
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

const Place = ({name, adminLevel1, country, temperature, conditions, humidity, windDirection, windSpeed, onPlaceRemoved}) => {
    const [showButton, setShowButton] = useState(false);
    return (
        <Col md={6} className={getBackgroundColor(temperature)} onMouseEnter={() => setShowButton(true)} onMouseLeave={() => setShowButton(false)}>
            <PlaceName name={name} adminLevel1={adminLevel1} country={country}/>
            <Temperature value={temperature}/>
            <Conditions conditions={conditions} humidity={humidity} windDirection={windDirection} windSpeed={windSpeed}/>
            {showButton && (
                <PlaceRemoveButton onPlaceRemoved={() => onPlaceRemoved(name, adminLevel1, country)}/>
            )}
        </Col>
    );
};

export default Place;
