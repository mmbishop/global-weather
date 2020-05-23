import Col from "react-bootstrap/Col";
import React from "react";

const handleKeyPress = (e, onChange) => {
    if (e.keyCode === 13) {
        onChange(e.target.value);
        e.target.value = "";
    }
}

const Search = ({onChange}) => {
    return (
        <Col sm={9} md={11} className="add-city">
            <input placeholder="City or place name" autoComplete="off" onKeyDown={(e) => handleKeyPress(e, onChange)}/>
        </Col>
    );
}

export default Search;