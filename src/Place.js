import React from 'react';
import Col from "react-bootstrap/Col";
import {PlaceName} from "./PlaceName";
import {Temperature} from "./Temperature";
import {Conditions} from "./Conditions";
import {PlaceRemoveButton} from "./PlaceRemoveButton";

export class Place extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            adminLevel1: props.adminLevel1,
            country: props.country,
            temperature: props.temperature,
            conditions: props.conditions,
            humidity: props.humidity,
            windDirection: props.windDirection,
            windSpeed: props.windSpeed
        };
        this.setRemoveButtonRef = element => {
            this.removeButtonRef = element;
        };
        this.onPlaceRemoved = props.onPlaceRemoved;
        this.handlePlaceRemoved = this.handlePlaceRemoved.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    setTemperature(temperature) {
        this.setState({temperature: temperature});
    }

    setConditions(conditions) {
        this.setState({conditions: conditions});
    }

    setHumidity(humidity) {
        this.setState({humidity: humidity});
    }

    setWindDirection(windDirection) {
        this.setState({windDirection: windDirection});
    }

    setWindSpeed(windSpeed) {
        this.setState({windSpeed: windSpeed});
    }

    getBackgroundColor() {
        const temp = this.state.temperature;
        if (temp >= 90.0) {
            return "hot";
        }
        else if (temp >= 70.0 && temp < 90.0) {
            return "warm";
        }
        else if (temp >= 40.0 && temp < 70.0) {
            return "cool";
        }
        else if (temp >= 0.0 && temp < 40.0) {
            return "cold";
        }
        return "frigid";
    }

    onMouseEnter = () => {
        this.removeButtonRef.show();
    }

    onMouseLeave = () => {
        this.removeButtonRef.hide();
    }

    handlePlaceRemoved() {
        this.onPlaceRemoved();
    }

    render() {
        return (
            <Col md={6} className={this.getBackgroundColor()} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <PlaceName name={this.state.name} adminLevel1={this.state.adminLevel1} country={this.state.country}/>
                <Temperature value={this.state.temperature}/>
                <Conditions description={this.state.conditions} humidity={this.state.humidity} windDirection={this.state.windDirection} windSpeed={this.state.windSpeed}/>
                <PlaceRemoveButton ref={this.setRemoveButtonRef} onPlaceRemoved={this.handlePlaceRemoved}/>
            </Col>
        );
    }

}