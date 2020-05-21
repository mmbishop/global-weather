import {Image, OverlayTrigger, Tooltip} from "react-bootstrap";
import React from "react";

const WeatherIcon = ({className = "weather-icon", icon, description}) => {

    return (
        <OverlayTrigger placement={"right"} delay={{show: 250, hide:400}} overlay={
            <Tooltip id={"button-tooltip"}>
                {description}
            </Tooltip>
        }>
            <Image className={className} src={require(`../../images/${icon}.png`)} alt={"Weather icon"}/>
        </OverlayTrigger>
    );

}

export default WeatherIcon;