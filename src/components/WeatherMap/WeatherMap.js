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

import {MapContainer, TileLayer} from "react-leaflet";
import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import {getLocationHierarchy} from "../../services/util";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import {Button} from "react-bootstrap";
import Legend from "./Legend";
import {getMapAttribution, getMapTileUrl} from "../../services/googleMaps";
import {getWeatherMapAttribution, getWeatherMapTileUrl} from "../../services/weather";

const WeatherMap = ({show, placeName, adminLevel1, country, lat, lng, onClose}) => {
    const position = [lat, lng];
    return (
        <Modal size={"lg"} show={show} onHide={onClose} animation={false} centered>
            <ModalHeader>
                <ModalTitle>{`Weather map for ${placeName}, ${getLocationHierarchy(adminLevel1, country)}`}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <MapContainer id={"weather-map"} center={position} zoom={11}>
                    <TileLayer url={getMapTileUrl()} attribution={getMapAttribution()}/>
                    <TileLayer url={getWeatherMapTileUrl()} opacity={0.6} attribution={getWeatherMapAttribution()}/>
                    <Legend/>
                </MapContainer>
            </ModalBody>
            <ModalFooter>
                <Button variant={"primary"} onClick={onClose}>Close</Button>
            </ModalFooter>
        </Modal>
    );

}

export default WeatherMap;