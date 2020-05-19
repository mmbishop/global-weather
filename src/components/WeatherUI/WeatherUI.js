import React, { useState, useCallback, useEffect } from 'react';
import { combineReducers, createStore } from 'redux';
import {Container} from "react-bootstrap";
import { map } from 'lodash/fp';
import Place from '../Place';
import findPlace from "../../services/googleMaps/findPlace";
import { getWeather } from "../../services/weather";
import Row from "react-bootstrap/Row";
import Search from "../Search";
import SettingsButton from "../Settings";
import ls from 'local-storage';
import SettingsDialog from "../SettingsDialog";
import { convertTemperature } from '../../services/weather';
import { convertSpeed } from '../../services/weather';

export const loadState = () => {
    try {
        const serializedState = ls.get('global-weather');
        console.log("loadState: " + serializedState);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        ls.set('global-weather', serializedState);
    }
    catch (err) {
        console.log("Error while saving global state: " + err);
    }
}

function placeReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_PLACE':
            return [...state, action.place];
        case 'REMOVE_PLACE':
            return action.places;
        default:
            return state;
    }
}

function settingsReducer(state = [], action) {
    if (action.type === 'UPDATE_SETTINGS') {
        return action.settings;
    }
    return state;
}

const persistedState = loadState();
const reducer = combineReducers({ placeReducer, settingsReducer });
const store = createStore(reducer, persistedState);
store.subscribe(() => {
    saveState(store.getState());
});

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
    const [places, setPlaces] = useState(store.getState().placeReducer);

    const addPlace = useCallback((name, displayUnits) => {
            getPlace(name, displayUnits).then(v => {
                setPlaces([...places, ...v]);
                store.dispatch({
                    type: 'ADD_PLACE',
                    place: v[0]
                });
            });
    }, [places, setPlaces]);

    const removePlace = useCallback((name, adminLevel1, country) => {
        const filteredPlaces = places.filter(place => place.name !== name || place.adminLevel1 !== adminLevel1 || place.country !== country);
        setPlaces(filteredPlaces);
        store.dispatch({
            type: 'REMOVE_PLACE',
            places: filteredPlaces
        });
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
    const [showSettings, setShowSettings] = useState(false);
    const [sortProperty, setSortProperty] = useState(store.getState().settingsReducer.sortProperty);
    const [sortOrder, setSortOrder] = useState(store.getState().settingsReducer.sortOrder);
    const [displayUnits, setDisplayUnits] = useState(store.getState().settingsReducer.displayUnits);

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
        store.dispatch({
            type: 'UPDATE_SETTINGS',
            settings: {sortProperty: sortProperty, sortOrder: sortOrder, displayUnits: newDisplayUnits}
        });
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
                                                               onPlaceRemoved={() => removePlace(value.name, value.adminLevel1, value.country)}/>)(getSortedPlaces(places, sortProperty, sortOrder))}
                </Row>
            </Container>
            <SettingsDialog show={showSettings}
                            onSettingsSaved={(sortProperty, sortOrder, oldDisplayUnits, newDisplayUnits) => updateSettings(sortProperty, sortOrder, oldDisplayUnits, newDisplayUnits)}
                            onClose={() => setShowSettings(false)}
                            currentSort={sortProperty} currentSortOrder={sortOrder} currentDisplayUnits={displayUnits}/>
        </div>
    );
};

export default WeatherUI;