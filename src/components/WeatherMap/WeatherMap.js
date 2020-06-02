import {Map, TileLayer} from "react-leaflet";
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
                <Map id={"weather-map"} center={position} zoom={11}>
                    <TileLayer url={getMapTileUrl()} attribution={getMapAttribution()}/>
                    <TileLayer url={getWeatherMapTileUrl()} opacity={0.6} attribution={getWeatherMapAttribution()}/>
                    <Legend/>
                </Map>
            </ModalBody>
            <ModalFooter>
                <Button variant={"primary"} onClick={onClose}>Close</Button>
            </ModalFooter>
        </Modal>
    );

}

export default WeatherMap;