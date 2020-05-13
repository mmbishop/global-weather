import React from "react";
import {Container} from "react-bootstrap";
import {SearchAndSettings} from "./SearchAndSettings";
import {PlaceList} from "./PlaceList";
import {WeatherService} from "./WeatherService";
import {PlaceService} from "./PlaceService";
import ls from 'local-storage';

export class WeatherUI extends React.Component {

    constructor(props) {
        super(props);
        this.placeListRef = null;
        this.setPlaceListRef = element => {
            this.placeListRef = element;
        }
        this.findPlace = this.findPlace.bind(this);
        this.weatherCallback = this.weatherCallback.bind(this);
        this.placeCallback = this.placeCallback.bind(this);
        this.handlePlaceRemoved = this.handlePlaceRemoved.bind(this);
        this.weatherService = new WeatherService();
        this.placeService = new PlaceService();
    }

    placeCallback(placeData) {
        this.weatherService.getWeather(placeData.lat, placeData.lng, placeData, this.weatherCallback);
    }

    weatherCallback(weatherData) {
        this.placeListRef.addPlace({name: weatherData.placeData.name, adminLevel1: weatherData.placeData.adminLevel1, country: weatherData.placeData.country,
            temperature: weatherData.temperature, humidity: weatherData.humidity, windDirection: weatherData.windDirection,
            windSpeed: weatherData.windSpeed, conditions: weatherData.conditions});
        if (! this.state.weatherPlaces.includes(weatherData.placeData.name)) {
            let newWeatherPlacesState = [...this.state.weatherPlaces, weatherData.placeData.name];
            this.setState({weatherPlaces: newWeatherPlacesState});
            ls.set('weatherPlaces', newWeatherPlacesState);
        }
    }

    findPlace(searchText) {
        this.placeService.getPlace(searchText, this.placeCallback);
    }

    handlePlaceRemoved(placeName) {
        this.setState(state => {
            const places = state.weatherPlaces.filter(place => place !== placeName);
            ls.set('weatherPlaces', places);
            return {
                places
            };
        });
    }

    render() {
        return (
            <Container>
                <SearchAndSettings onChange={this.findPlace}/>
                <PlaceList ref={this.setPlaceListRef} onPlaceRemoved={this.handlePlaceRemoved}/>
            </Container>
        );
    }

    componentDidMount() {
        this.setState({weatherPlaces: ls.get('weatherPlaces') || []}, function () {
            this.state.weatherPlaces.map(place => {
                this.findPlace(place);
                return place;
            });
        });
    }

}