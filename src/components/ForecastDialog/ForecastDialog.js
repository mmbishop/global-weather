import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import Modal from "react-bootstrap/Modal";
import React from "react";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import {Button} from "react-bootstrap";
import { map } from 'lodash/fp';
import Moment from "react-moment";
import HourlyForecastTile from "../HourlyForecastTile";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DailyForecastTile from "../DailyForecastTile/DailyForecastTile";

export const ForecastDialog = ({show, placeName, adminLevel1, country, forecast, displayUnits, onClose}) => {
    return (
        <Modal show={show} onHide={onClose} animation={false} centered>
            <ModalHeader>
                <ModalTitle>{`Forecast for ${placeName}, ${adminLevel1}, ${country}`}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Tabs id={"forecastTab"} defaultActiveKey={"hourly"}>
                    <Tab eventKey={"hourly"} title={"Hourly"} style={{overflowY: "scroll", height: "557px"}}>
                        {map.convert({cap: false})(forecast =>
                            <HourlyForecastTile displayUnits={displayUnits} time={forecast.time} weatherData={forecast}/>
                        )(forecast.hourlyForecast)}
                    </Tab>
                    <Tab eventKey={"daily"} title={"Daily"} style={{overflowY: "scroll", height: "557px"}}>
                        {map.convert({cap: false})(forecast =>
                            <DailyForecastTile time={forecast.time} displayUnits={displayUnits} weatherData={forecast}/>
                        )(forecast.dailyForecast)}
                    </Tab>
                </Tabs>
            </ModalBody>
            <ModalFooter>
                <Button variant={"primary"} onClick={onClose}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ForecastDialog;