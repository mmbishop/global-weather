import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import settingsIconImage from "../../images/gear.png";
import React from "react";

const SettingsButton = ({onSettingsRequested}) => {
    return (
        <Col xs={2} md={1}>
            <Image className="settings-icon" src={settingsIconImage} alt="SettingsButton" onClick={onSettingsRequested}/>
        </Col>
    );
}

export default SettingsButton;
