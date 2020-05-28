import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import PlaceName from "../PlaceName";
import Conditions from "../Conditions";
import PlaceRemoveButton from "../PlaceRemoveButton";
import Temperature from "../Temperature";
import WeatherMenu from "../WeatherMenu/WeatherMenu";
import WeatherIcon from "../WeatherIcon";
import {getBackgroundColor} from "../../services/ui";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Place = ({name, adminLevel1, country, weatherData, displayUnits, onPlaceRemoved, onForecastRequested, onWeatherMapRequested}) => {
    const [hasFocus, setHasFocus] = useState(false);
    const roundedTemperature = Math.round(weatherData.temperature);
    const roundedFeelsLike = Math.round(weatherData.feelsLike);
    const roundedWindSpeed = Math.round(weatherData.windSpeed);

    return (
        <Col md={6} className={getBackgroundColor(roundedTemperature, displayUnits)}
             onMouseEnter={() => setHasFocus(true)}
             onMouseLeave={() => setHasFocus(false)}>
            <Container>
                {hasFocus && (
                    <PlaceRemoveButton onPlaceRemoved={() => onPlaceRemoved(name, adminLevel1, country)}/>
                )}
                {hasFocus && (
                    <WeatherMenu onForecastRequested={() => onForecastRequested(name, adminLevel1, country)}
                                 onMapRequested={() => onWeatherMapRequested(name, adminLevel1, country)}/>
                )}
                <Row>
                    <Col xs={8} md={5} md-offset={1} xs-offset={0}>
                        <PlaceName name={name} adminLevel1={adminLevel1} country={country}/>
                    </Col>
                    <Col xs={2} md={6}>
                        <Temperature value={roundedTemperature} displayUnits={displayUnits}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={10} md-offset={1} xs={8} xs-offset={0}>
                        <Conditions feelsLike={roundedFeelsLike} humidity={weatherData.humidity} windDirection={weatherData.windDirection} windSpeed={roundedWindSpeed} displayUnits={displayUnits}/>
                    </Col>
                    <Col md={1} xs={4}>
                        {weatherData.icon !== undefined && (
                            <WeatherIcon icon={weatherData.icon} description={weatherData.conditions}/>
                        )}
                    </Col>
                </Row>
            </Container>
        </Col>
    );
};

export default Place;
