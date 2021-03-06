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

import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import PlaceName from "../PlaceName";
import Conditions from "../Conditions";
import PlaceRemoveButton from "../PlaceRemoveButton";
import Temperature from "../Temperature";
import WeatherMenu from "../WeatherMenu/WeatherMenu";
import WeatherIcon from "../WeatherIcon";
import {getPlaceTileClassName} from "../../services/ui";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Place = ({name, adminLevel1, country, weatherData, displayUnits, onPlaceRemoved, onForecastRequested, onWeatherMapRequested}) => {
    const [hasFocus, setHasFocus] = useState(false);
    const roundedTemperature = Math.round(weatherData.temperature);
    const roundedFeelsLike = Math.round(weatherData.feelsLike);
    const roundedWindSpeed = Math.round(weatherData.windSpeed);

    return (
        <Col md={6} className={getPlaceTileClassName(weatherData.temperature, displayUnits)}
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
                    <Col xs={10} md={7} md-offset={1} xs-offset={0}>
                        <PlaceName name={name} adminLevel1={adminLevel1} country={country}/>
                    </Col>
                    <Col xs={2} md={5}>
                        <Temperature value={roundedTemperature} displayUnits={displayUnits}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={10} md-offset={1} xs={9} xs-offset={0}>
                        <Conditions feelsLike={roundedFeelsLike} humidity={weatherData.humidity} windDirection={weatherData.windDirection} windSpeed={roundedWindSpeed} displayUnits={displayUnits}/>
                    </Col>
                    <Col md={1} xs={3}>
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
