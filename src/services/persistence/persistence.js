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

import ls from "local-storage";
import {combineReducers, createStore} from "redux";

const loadState = () => {
    try {
        const serializedState = ls.get('global-weather');
        console.log("loadState: " + serializedState);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch (err) {
        console.log("Error while loading global state: " + err);
        return undefined;
    }
}

const saveState = (state) => {
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
            return state.filter(place => place.name !== action.place.name || place.adminLevel1 !== action.place.adminLevel1 || place.country !== action.place.country);
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

let store;

const initializeUndefinedSettings = (persistedState) => {
    let settings;
    if (persistedState === undefined) {
        settings = undefined;
        persistedState = {};
    }
    else {
        settings = persistedState.settingsReducer;
    }
    if (settings === undefined) {
        settings = {sortProperty: "name", sortOrder: "ascending", displayUnits: "imperial"}
    }
    else {
        if (settings.sortProperty === undefined) {
            settings.sortProperty = "name";
        }
        if (settings.sortOrder === undefined) {
            settings.sortOrder = "ascending";
        }
        if (settings.displayUnits === undefined) {
            settings.displayUnits = "imperial";
        }
    }
    persistedState.settingsReducer = settings;
    return persistedState;
}

export const loadPersistedState = () => {
    const persistedState = initializeUndefinedSettings(loadState());
    const reducer = combineReducers({ placeReducer, settingsReducer });
    store = createStore(reducer, persistedState);
    store.subscribe(() => {
        saveState(store.getState());
    });
}

export const getPlaces = () => {
    return store.getState().placeReducer;
}

export const savePlace = (place) => {
    store.dispatch({
        type: 'ADD_PLACE',
        place: place
    });
}

export const deletePlace = (place) => {
    store.dispatch({
        type: 'REMOVE_PLACE',
        place: { name: place.name, adminLevel1: place.adminLevel1, country: place.country }
    });
}

export const getSettings = () => {
    return store.getState().settingsReducer;
}

export const saveSettings = (settings) => {
    store.dispatch({
        type: 'UPDATE_SETTINGS',
        settings: { sortProperty: settings.sortProperty, sortOrder: settings.sortOrder, displayUnits: settings.displayUnits }
    });
}

