//<editor-fold desc="Copyright (c) 2020 Michael Bishop">
// global-weather
// Copyright (c) 2020 Michael Bishop
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//</editor-fold>

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
                    <Conditions className={"hourly-details"} feelsLike={roundedFeelsLike} humidity={weatherData.humidity} windDirection={weatherData.windDirection} windSpeed={roundedWindSpeed}
                                pressure={weatherData.pressure} showSunriseAndSunset={false} displayUnits={displayUnits}/>
                </Col>
            </Row>
        </Container>
    );
}

export default HourlyForecastTile;