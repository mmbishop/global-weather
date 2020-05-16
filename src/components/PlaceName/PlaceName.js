import React from "react";

const getLocationHierarchy = (adminLevel1, country) => {
    if (adminLevel1 && adminLevel1 !== "") {
        return adminLevel1 + ", " + country;
    }
    return country;
}

const PlaceName = ({name, adminLevel1, country}) => {
    return (
        <div className="city">{name}<span>{getLocationHierarchy(adminLevel1, country)}</span></div>
    );
}

export default PlaceName;