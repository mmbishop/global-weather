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

import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import settingsIconImage from "../../images/gear.png";
import React from "react";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Col xs={3} md={2}>
        <a href="" ref={ref} onClick={e => {e.preventDefault(); onClick(e)}}>
            <Image className="settings-icon" src={settingsIconImage} alt="SettingsButton"/>
        </a>
    </Col>
));

const SettingsButton = ({onSettingsRequested, handleLogout}) => {
    return (
        <Dropdown drop="down">
            <DropdownToggle as={CustomToggle} id="dropdown-custom-components"/>
            <DropdownMenu className={"weather-menu"}>
                <DropdownItem className={"weather-menu-item"} onClick={onSettingsRequested}>Settings</DropdownItem>
                <DropdownItem className={"weather-menu-item"} onClick={handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default SettingsButton;
