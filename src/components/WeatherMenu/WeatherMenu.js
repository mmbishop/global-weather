import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

const WeatherMenu = ({onForecastRequested, onMapRequested}) => {

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <button className={"weather-menu-button"}
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
        >&#x25bc;</button>
    ));

    return (
        <Dropdown alignRight>
            <DropdownToggle as={CustomToggle} id={"weather-menu-toggle"} className={"weather-menu-button"} title={""}/>
            <DropdownMenu className={"weather-menu"}>
                <DropdownItem className={"weather-menu-item"} onClick={onForecastRequested}>Forecast</DropdownItem>
                <DropdownItem className={"weather-menu-item"} onClick={onMapRequested}>Weather Map</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );

}

export default WeatherMenu;