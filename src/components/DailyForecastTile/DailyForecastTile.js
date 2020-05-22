import React from "react";
import Moment from "react-moment";
import WeatherIcon from "../WeatherIcon";
import Temperature from "../Temperature";
import {getBackgroundColor} from "../../services/ui";
import Conditions from "../Conditions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DailyForecastTile = ({time, weatherData, displayUnits}) => {
    const roundedHighTemperature = Math.round(weatherData.highTemperature);
    const roundedLowTemperature = Math.round(weatherData.lowTemperature);
    const roundedFeelsLike = Math.round(weatherData.feelsLike);
    const roundedWindSpeed = Math.round(weatherData.windSpeed);
    const highTemperatureColor = getBackgroundColor(roundedHighTemperature, displayUnits);
    const lowTemperatureColor = getBackgroundColor(roundedLowTemperature, displayUnits);

    return (
        <Container className={"border-bottom"}>
            <Row>
                <Col className={"col-md-12"}>
                    <Moment className={"daily-forecast-time"} format={"dddd, MM/DD/YYYY"}>{time}</Moment>
                </Col>
            </Row>
            <Row>
                <Col className={"col-md-4"}>
                    {weatherData.icon !== undefined && (
                        <WeatherIcon className={"hourly-weather-icon"} icon={weatherData.icon} description={weatherData.conditions}/>
                    )}
                </Col>
                <Col className={"col-md-4"}>
                    <Temperature className={`${highTemperatureColor}-foreground daily-temperature`} value={roundedHighTemperature} displayUnits={displayUnits}/>
                </Col>
                <Col className={"col-md-4"}>
                    <Temperature className={`${lowTemperatureColor}-foreground daily-temperature`} value={roundedLowTemperature} displayUnits={displayUnits}/>
                </Col>
            </Row>
            <Row>
                <Col className={"col-md-9 col-md-offset-3"}>
                    <Conditions className={"daily-details"} feelsLike={roundedFeelsLike} humidity={weatherData.humidity} windDirection={weatherData.windDirection} windSpeed={roundedWindSpeed} displayUnits={displayUnits}/>
                </Col>
            </Row>
        </Container>
    );
}

export default DailyForecastTile;