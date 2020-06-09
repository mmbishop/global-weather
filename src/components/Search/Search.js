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
import React from "react";

const handleKeyPress = (e, onChange) => {
    if (e.keyCode === 13) {
        onChange(e.target.value);
        e.target.value = "";
    }
}

const Search = ({onChange}) => {
    return (
        <Col xs={10} md={11} className="add-city">
            <input placeholder="City or place name" autoComplete="off" onKeyDown={(e) => handleKeyPress(e, onChange)}/>
        </Col>
    );
}

export default Search;