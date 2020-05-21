import React from "react";
import {getLocationHierarchy} from "../../services/util";

const PlaceName = ({name, adminLevel1, country}) => {
    return (
        <div className="city">{name}<span>{getLocationHierarchy(adminLevel1, country)}</span></div>
    );
}

export default PlaceName;