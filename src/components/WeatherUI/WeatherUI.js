import React, { useState, useCallback } from 'react';
import { combineReducers, createStore } from 'redux';
import {Container} from "react-bootstrap";
import { map } from 'lodash/fp';
import Place from '../Place';
import findPlace from "../../services/googleMaps/findPlace";
import { getWeather } from "../../services/weather";
import Row from "react-bootstrap/Row";
import Search from "../Search";
import Settings from "../Settings";
import ls from 'local-storage';

export const loadState = () => {
    try {
        const serializedState = ls.get('global-weather');
        console.log("serializedState = " + serializedState);
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

const persistedState = loadState();
const reducer = combineReducers({ placeReducer });
const store = createStore(reducer, persistedState);
store.subscribe(() => {
    saveState(store.getState());
});

const getPlace = (name) => {
    return findPlace(name).then(place =>
        getWeather(place.lat, place.lng).then(weather => ([{
                "name": place.name, "adminLevel1": place.adminLevel1, "country": place.country, "lat": place.lat, "lng": place.lng, "temperature": weather.temperature,
                "conditions": weather.conditions, "humidity": weather.humidity, "windDirection": weather.windDirection, "windSpeed": weather.windSpeed
        }]))
    );
}

const useWeatherPlaces = () => {
    const [places, setPlaces] = useState(store.getState().placeReducer);

    const addPlace = useCallback((name) => {
            getPlace(name).then(v => {
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

    return [places, addPlace, removePlace];
}

const getSortedPlaces = (places) => {
    return places.sort((a, b) => b.temperature - a.temperature);
}

const WeatherUI = () => {
    const [places, addPlace, removePlace] = useWeatherPlaces();
    const [search, setSearch] = useState("");
    return (
        <Container>
            <form onSubmit={(e) => {
                e.preventDefault();
                addPlace(search)
            }}>
                <Row>
                    <Search onChange={v => setSearch(v)}/>
                    <Settings/>
                </Row>
            </form>
            <Row id={"locations"}>
                {map.convert({cap: false})(value => <Place key={`${value.name}-${value.adminLevel1}-${value.country}`} name={value.name} adminLevel1={value.adminLevel1}
                                                                  country={value.country} temperature={value.temperature} conditions={value.conditions}
                                                                  humidity={value.humidity} windDirection={value.windDirection} windSpeed={value.windSpeed}
                                                                  onPlaceRemoved={() => removePlace(value.name, value.adminLevel1, value.country)}/>)(getSortedPlaces(places))}
            </Row>
        </Container>
    );
};

export default WeatherUI;