import React from 'react';
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import settingsIconImage from "./images/gear.png";

export class SettingsIcon extends React.Component {

    render() {
        return <Col sm={3} md={1}><Image className="settings-icon" src={settingsIconImage} alt="Settings"/></Col>;
    }

}