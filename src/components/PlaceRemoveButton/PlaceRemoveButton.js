import React from "react";

const PlaceRemoveButton = ({onPlaceRemoved}) => {
    return (
        <div className={"close"} onClick={onPlaceRemoved}>x</div>
    );
}

export default PlaceRemoveButton;