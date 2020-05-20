import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import Modal from "react-bootstrap/Modal";
import React from "react";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import {Button} from "react-bootstrap";
import { map } from 'lodash/fp';
import Moment from "react-moment";

export const ForecastDialog = ({show, placeName, adminLevel1, country, forecast, onClose}) => {
    return (
        <Modal show={show} onHide={onClose} animation={false} centered>
            <ModalHeader>
                <ModalTitle>{`Forecast for ${placeName}, ${adminLevel1}, ${country}`}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <h3>Hourly Forecast</h3>
                {map.convert({cap: false})(forecast =>
                    <div>
                        <Moment format={"MM/DD/YYYY HH:mm"}>{forecast.time}</Moment>:&nbsp;
                        Temperature: {Math.round(forecast.temperature)}, Feels like: {Math.round(forecast.feelsLike)}, Conditions: {forecast.conditions}
                    </div>
                )(forecast.hourlyForecast)}
                <h3>Daily Forecast</h3>
                {map.convert({cap: false})(forecast =>
                    <div>
                        <Moment format={"MM/DD/YYYY"}>{forecast.time}</Moment>:&nbsp;
                        High temperature: {Math.round(forecast.highTemperature)}, Low temperature: {Math.round(forecast.lowTemperature)}, Conditions: {forecast.conditions}
                    </div>
                )(forecast.dailyForecast)}
            </ModalBody>
            <ModalFooter>
                <Button variant={"primary"} onClick={onClose}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ForecastDialog;