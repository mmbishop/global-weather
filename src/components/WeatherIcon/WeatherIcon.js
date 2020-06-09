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