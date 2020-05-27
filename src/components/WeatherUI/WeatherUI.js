import React, { useState, useCallback, useEffect } from 'react';
import {Container} from "react-bootstrap";
import { map } from 'lodash/fp';
import Place from '../Place';
import findPlace from "../../services/googleMaps/findPlace";
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

const getSortedPlaces = (places, sortProperty, sortOrder) => {
    switch (sortProperty) {
        case "name":
            return places.sort((a, b) => sortOrder === "ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        case "temperature":
            return places.sort((a, b) => sortOrder === "ascending" ? a.temperature - b.temperature : b.temperature - a.temperature);
        case "conditions":
            return places.sort((a, b) => sortOrder === "ascending" ? a.conditions.localeCompare(b.conditions) : b.conditions.localeCompare(a.conditions));
        case "humidity":
            return places.sort((a, b) => sortOrder === "ascending" ? a.humidity - b.humidity : b.humidity - a.humidity);
        case "windSpeed":
            return places.sort((a, b) => sortOrder === "ascending" ? a.windSpeed - b.windSpeed : b.windSpeed - a.windSpeed);
        default:
            return places;
    }
}

const WeatherUI = () => {
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

    useEffect(() => {
        Promise.all(places.map(place => getWeather(place.lat, place.lng, displayUnits).then(weather => createWeatherObject(place, weather))))
            .then((values) => setPlaces(values.flat()));

        const interval = setInterval(() => {
            Promise.all(places.map(place => getWeather(place.lat, place.lng, displayUnits).then(weather => createWeatherObject(place, weather))))
                .then((values) => setPlaces(values.flat()));
        }, 600000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Container>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addPlace(search, displayUnits)
                }}>
                    <Row>
                        <Search onChange={v => setSearch(v)}/>
                        <SettingsButton onSettingsRequested={() => setShowSettings(true)}/>
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