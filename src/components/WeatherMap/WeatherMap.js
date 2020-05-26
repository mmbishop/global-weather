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

const WeatherMap = ({show, placeName, adminLevel1, country, lat, lng, onClose}) => {
    const position = [lat, lng];
    return (
        <Modal size={"lg"} show={show} onHide={onClose} animation={false} centered>
            <ModalHeader>
                <ModalTitle>{`Weather map for ${placeName}, ${getLocationHierarchy(adminLevel1, country)}`}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Map id={"weather-map"} center={position} zoom={11}>
                    <TileLayer url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                               attribution={"&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"}/>
                    <TileLayer url={`https://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`}
                               opacity={0.6} attribution={"Weather from OpenWeatherMap"}/>
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