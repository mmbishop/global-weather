import React from 'react';
import {getPlaceTileClassName} from "../../services/ui";
import Temperature from "../Temperature";
import Conditions from "../Conditions";
import WeatherIcon from "../WeatherIcon";
import Moment from "react-moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HourlyForecastTile = ({time, weatherData, displayUnits}) => {
    const roundedTemperature = Math.round(weatherData.temperature);
    const roundedFeelsLike = Math.round(weatherData.feelsLike);
    const roundedWindSpeed = Math.round(weatherData.windSpeed);
    const temperatureColor = getPlaceTileClassName(roundedTemperature, displayUnits);

    return (
        <Container className={temperatureColor}>
            <Row>
                <Col xs={12} md={12}>
                    <Moment className={"hourly-forecast-time"} format={"dddd, MM/DD/YYYY HH:mm"}>{time}</Moment>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={8}>
                    {weatherData.icon !== undefined && (
                        <WeatherIcon className={"hourly-weather-icon"} icon={weatherData.icon} description={weatherData.conditions}/>
                    )}
                </Col>
                <Col xs={6} md={4}>
                    <Temperature className={"hourly-temperature"} value={roundedTemperature} displayUnits={displayUnits}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={12}>
                    <Conditions className={"hourly-details"} feelsLike={roundedFeelsLike} humidity={weatherData.humidity} windDirection={weatherData.windDirection} windSpeed={roundedWindSpeed} displayUnits={displayUnits}/>
                </Col>
            </Row>
        </Container>
    );
}

export default HourlyForecastTile;