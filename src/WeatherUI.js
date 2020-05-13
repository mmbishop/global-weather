import React from "react";
import {Container} from "react-bootstrap";
import {SearchAndSettings} from "./SearchAndSettings";
import {PlaceList} from "./PlaceList";
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
        this.placeCallback = this.placeCallback.bind(this);
        this.handlePlaceRemoved = this.handlePlaceRemoved.bind(this);
        this.placeService = new PlaceService();
    }

    placeCallback(placeData) {
        this.placeListRef.addPlace({name: placeData.name, adminLevel1: placeData.adminLevel1, country: placeData.country,
            latitude: placeData.lat, longitude: placeData.lng})
        if (! this.state.weatherPlaces.includes(placeData.name)) {
            let newWeatherPlacesState = [...this.state.weatherPlaces, placeData.name];
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