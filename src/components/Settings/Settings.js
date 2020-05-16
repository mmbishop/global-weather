import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import settingsIconImage from "../../images/gear.png";
import React from "react";

const Settings = () => {
    return (
        <Col sm={3} md={1}>
            <Image className="settings-icon" src={settingsIconImage} alt="Settings"/>
        </Col>
    );
}

export default Settings;