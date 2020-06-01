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
    let settings = persistedState.settingsReducer;
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
}

export const loadPersistedState = () => {
    const persistedState = loadState();
    initializeUndefinedSettings(persistedState);
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

