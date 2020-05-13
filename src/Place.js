import React from 'react';
import Col from "react-bootstrap/Col";
import {PlaceName} from "./PlaceName";
import {Temperature} from "./Temperature";
import {Conditions} from "./Conditions";
import {PlaceRemoveButton} from "./PlaceRemoveButton";
import {WeatherService} from "./WeatherService";

export class Place extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            adminLevel1: props.adminLevel1,
            country: props.country,
            latitude: props.latitude,
            longitude: props.longitude
        };
        this.setRemoveButtonRef = element => {
            this.removeButtonRef = element;
        };
        this.onPlaceRemoved = props.onPlaceRemoved;
        this.handlePlaceRemoved = this.handlePlaceRemoved.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.weatherCallback = this.weatherCallback.bind(this);
        this.weatherService = new WeatherService();
        this.updateTimer = null;
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

    getBackgroundColor(temp) {
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
        else if (temp < 0.0) {
            return "frigid";
        }
        return "undefined-temp";
    }

    onMouseEnter = () => {
        this.removeButtonRef.show();
    }

    onMouseLeave = () => {
        this.removeButtonRef.hide();
    }

    handlePlaceRemoved() {
        clearInterval(this.updateTimer);
        this.onPlaceRemoved();
    }

    weatherCallback(weatherData) {
        this.setState({weatherClassName: this.getBackgroundColor(weatherData.temperature),
            temperature: <Temperature value={weatherData.temperature}/>,
            conditions: <Conditions description={weatherData.conditions} humidity={weatherData.humidity} windDirection={weatherData.windDirection}
                                    windSpeed={weatherData.windSpeed}/>});
    }

    componentDidMount() {
        this.weatherService.getWeather(this.state.latitude, this.state.longitude, this.weatherCallback);
        this.updateTimer = setInterval(() => {
            this.weatherService.getWeather(this.state.latitude, this.state.longitude, this.weatherCallback);
        }, 60000);
    }

    render() {
        return (
            <Col md={6} className={this.state.weatherClassName} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <PlaceName name={this.state.name} adminLevel1={this.state.adminLevel1} country={this.state.country}/>
                {this.state.temperature} {this.state.conditions}
                <PlaceRemoveButton ref={this.setRemoveButtonRef} onPlaceRemoved={this.handlePlaceRemoved}/>
            </Col>
        );
    }

}