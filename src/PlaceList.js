import React from "react";
import Row from "react-bootstrap/Row";
import {Place} from "./Place";

export class PlaceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            places: []
        };
        this.onPlaceRemoved = props.onPlaceRemoved;
        this.handlePlaceRemoved = this.handlePlaceRemoved.bind(this);
    }

    handlePlaceRemoved(placeName) {
        this.setState({places: this.state.places.filter(place => {
            return place.props.name !== placeName;
        })});
        this.onPlaceRemoved(placeName);
    }

    generateKey(place) {
        return place.name.replace(" ", "-") + "-" + place.adminLevel1 + "-" + place.country;
    }

    addPlace(place) {
        this.setState({
            places: this.state.places.concat(
                <Place key={this.generateKey(place)} name={place.name} adminLevel1={place.adminLevel1} country={place.country}
                    latitude={place.latitude} longitude={place.longitude} onPlaceRemoved={() => this.handlePlaceRemoved(place.name)}/>)
        });
    }

    render() {
        return (
            <Row id={"locations"}>
                {this.state.places}
            </Row>
        );
    }

}