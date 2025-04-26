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

import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import Modal from "react-bootstrap/Modal";
import React from "react";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import {Button} from "react-bootstrap";
import { map } from 'lodash/fp';
import HourlyForecastTile from "../HourlyForecastTile";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DailyForecastTile from "../DailyForecastTile/DailyForecastTile";
import {getLocationHierarchy} from "../../services/util";

export const ForecastDialog = ({show, placeName, adminLevel1, country, forecast, displayUnits, onClose}) => {
    return (
        <Modal className={"forecast-dialog"} show={show} onHide={onClose} animation={false} centered>
            <ModalHeader>
                <ModalTitle>{`Forecast for ${placeName}, ${getLocationHierarchy(adminLevel1, country)}`}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Tabs id={"forecastTab"} defaultActiveKey={"hourly"}>
                    <Tab eventKey={"hourly"} title={"Hourly"} style={{overflowY: "scroll", height: "557px"}}>
                        {map.convert({cap: false})(forecast =>
                            <HourlyForecastTile key={`hourly-${placeName}-${adminLevel1}-${country}-${forecast.time}`}
                                                displayUnits={displayUnits} time={forecast.time} weatherData={forecast}/>
                        )(forecast.hourlyForecast)}
                    </Tab>
                    <Tab eventKey={"daily"} title={"Daily"} style={{overflowY: "scroll", height: "557px"}}>
                        {map.convert({cap: false})(forecast =>
                            <DailyForecastTile key={`daily-${placeName}-${adminLevel1}-${country}-${forecast.time}`}
                                               time={forecast.time} displayUnits={displayUnits} weatherData={forecast}/>
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