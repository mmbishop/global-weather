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

import React, { useState, useCallback, useEffect } from 'react';
import {Container} from "react-bootstrap";
import { map } from 'lodash/fp';
import Place from '../Place';
import {findPlace} from "../../services/googleMaps";
import { getWeather, getForecast } from "../../services/weather";
import Row from "react-bootstrap/Row";
import Search from "../Search";
import SettingsButton from "../Settings";
import SettingsDialog from "../SettingsDialog";
import { convertTemperature } from '../../services/weather';
import { convertSpeed } from '../../services/weather';
import ForecastDialog from "../ForecastDialog/ForecastDialog";
import WeatherMap from "../WeatherMap";
import {deletePlace, getPlaces, getSettings, loadPersistedState, savePlace, saveSettings} from "../../services/persistence";
import {getSortedPlaces} from "../../services/util";
import {Auth} from "aws-amplify";
import {useHistory} from "react-router";
import { useAppContext} from "../../libs/contextLib";
import logoutIconImage from "../../images/logout-icon.jpg"
import Image from "react-bootstrap/Image";

loadPersistedState();

const createWeatherObject = (place, weather) => {
    console.log(`createWeatherObject(${place.name}, ${weather.temperature}, ${weather.icon})`);
    return ([{
        name: place.name, adminLevel1: place.adminLevel1, country: place.country, lat: place.lat, lng: place.lng, temperature: weather.temperature,
        conditions: weather.conditions, humidity: weather.humidity, windDirection: weather.windDirection, windSpeed: weather.windSpeed,
        feelsLike: weather.feelsLike, icon: weather.icon
    }]);
}

const getPlace = (name, displayUnits) => {
    return findPlace(name)
        .then(place => getWeather(place.lat, place.lng, displayUnits)
            .then(weather => createWeatherObject(place, weather)));
}

const useWeatherPlaces = () => {
    const [places, setPlaces] = useState(getPlaces());

    const addPlace = useCallback((name, displayUnits) => {
            getPlace(name, displayUnits).then(v => {
                setPlaces([...places, ...v]);
                savePlace(v[0]);
            });
    }, [places, setPlaces]);

    const removePlace = useCallback((name, adminLevel1, country) => {
        const filteredPlaces = places.filter(place => place.name !== name || place.adminLevel1 !== adminLevel1 || place.country !== country);
        setPlaces(filteredPlaces);
        deletePlace({ name: name, adminLevel1: adminLevel1, country: country });
    }, [places, setPlaces]);

    return [places, setPlaces, addPlace, removePlace];
}

const WeatherUI = () => {
    const history = useHistory();
    const [places, setPlaces, addPlace, removePlace] = useWeatherPlaces();
    const [search, setSearch] = useState("");
    const [forecastPlace, setForecastPlace] = useState({});
    const [showForecast, setShowForecast] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const settings = getSettings();
    const [sortProperty, setSortProperty] = useState(settings.sortProperty);
    const [sortOrder, setSortOrder] = useState(settings.sortOrder);
    const [displayUnits, setDisplayUnits] = useState(settings.displayUnits);
    const { userHasAuthenticated } = useAppContext();

    const updateSettings = (sortProperty, sortOrder, oldDisplayUnits, newDisplayUnits) => {
        setSortProperty(sortProperty);
        setSortOrder(sortOrder);
        setDisplayUnits(newDisplayUnits);
        setShowSettings(false);
        if (newDisplayUnits !== oldDisplayUnits) {
            setPlaces(places.map(place => {
                place.temperature = convertTemperature(place.temperature, oldDisplayUnits, newDisplayUnits);
                place.feelsLike = convertTemperature(place.feelsLike, oldDisplayUnits, newDisplayUnits);
                place.windSpeed = convertSpeed(place.windSpeed, oldDisplayUnits, newDisplayUnits);
                return place;
            }));
        }
        saveSettings({ sortProperty: sortProperty, sortOrder: sortOrder, displayUnits: newDisplayUnits });
    }

    const showForecastDialog = (placeName, adminLevel1, country) => {
        const forecastPlace = places.find(place => place.name === placeName && place.adminLevel1 === adminLevel1 && place.country === country);
        getForecast(forecastPlace.lat, forecastPlace.lng, displayUnits)
            .then(forecast => {
                setForecastPlace({placeName: placeName, adminLevel1: adminLevel1, country: country, forecast: forecast});
                setShowForecast(true);
        });
    }

    const showWeatherMap = (placeName, adminLevel1, country) => {
        setForecastPlace(places.find(place => place.name === placeName && place.adminLevel1 === adminLevel1 && place.country === country));
        setShowMap(true);
    }

    function handleLogout() {
        Auth.signOut()
            .then(() => {
                userHasAuthenticated(false);
                history.push("/login");
            });
    }

    useEffect(() => {
        Promise.all(getPlaces().map(place => getWeather(place.lat, place.lng, displayUnits).then(weather => createWeatherObject(place, weather))))
            .then((values) => setPlaces(values.flat()));

        const interval = setInterval(() => {
            Promise.all(getPlaces().map(place => getWeather(place.lat, place.lng, getSettings().displayUnits).then(weather => createWeatherObject(place, weather))))
                .then((values) => setPlaces(values.flat()));
        }, 600000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Container className="m-auto" style={{width:"70%"}} fluid={true}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addPlace(search, displayUnits)
                }}>
                    <Row>
                        <Search onChange={v => setSearch(v)}/>
                        <SettingsButton onSettingsRequested={() => setShowSettings(true)}/>
                        <Image className="logout-icon" src={logoutIconImage} alt="Logout" onClick={handleLogout}/>
                    </Row>
                </form>
                <Row id={"locations"}>
                    {map.convert({cap: false})(value => <Place key={`${value.name}-${value.adminLevel1}-${value.country}`} name={value.name} adminLevel1={value.adminLevel1}
                                                               country={value.country} weatherData={value} displayUnits={displayUnits}
                                                               onPlaceRemoved={() => removePlace(value.name, value.adminLevel1, value.country)}
                                                               onForecastRequested={(placeName, adminLevel1, country) => showForecastDialog(placeName, adminLevel1, country)}
                                                               onWeatherMapRequested={(placeName, adminLevel1, country) => showWeatherMap(placeName, adminLevel1, country)}/>)(getSortedPlaces(places, sortProperty, sortOrder))}
                </Row>
            </Container>
            <div className={"attribution-footer"}>
                Powered by <a href={"http://openweathermap.org"}>OpenWeatherMap</a>, <a href={"http://maps.google.com"}>Google Maps</a>,&nbsp;
                <a href={"https://www.deviantart.com/d3stroy/art/SILq-Weather-Icons-356609017"}>SILq Weather Icons</a>
            </div>
            <SettingsDialog show={showSettings}
                            onSettingsSaved={(sortProperty, sortOrder, oldDisplayUnits, newDisplayUnits) => updateSettings(sortProperty, sortOrder, oldDisplayUnits, newDisplayUnits)}
                            onClose={() => setShowSettings(false)}
                            currentSort={sortProperty} currentSortOrder={sortOrder} currentDisplayUnits={displayUnits}/>
            {showForecast &&
                <ForecastDialog show={showForecast} placeName={forecastPlace.placeName}
                                adminLevel1={forecastPlace.adminLevel1} country={forecastPlace.country}
                                forecast={forecastPlace.forecast} displayUnits={displayUnits} onClose={() => setShowForecast(false)}/>
            }
            {showMap &&
                <WeatherMap show={showMap} placeName={forecastPlace.name} adminLevel1={forecastPlace.adminLevel1}
                            country={forecastPlace.country} lat={forecastPlace.lat} lng={forecastPlace.lng}
                            onClose={() => setShowMap(false)}/>
            }
        </div>
    );
};

export default WeatherUI;
