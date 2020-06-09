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

import React, {useEffect} from "react";
import {withLeaflet} from "react-leaflet";
import L from "leaflet";

const Legend = (props) => {

    const colorMap = [{value: 100, color: "#bb0000"}, {value: 50, color: "#f70000"}, {value: 25, color: "#fe3f00"}, {value: 20, color: "#fe8b00"},
        {value: 15, color: "#fed300"}, {value: 10, color: "#d9fe1b"}, {value: 7.5, color: "#9bfe63"}, {value: 5, color: "#4ffdaf"},
        {value: 2.5, color: "#07fdf7"}, {value: 1, color: "#00adfd"}, {value: 0.5, color: "#004ffd"}, {value: 0.25, color: "#0000f7"},
        {value: 0.1, color: "#0000bb"}];

    const createLegendItemsHtml = () => {
        let labels = ['<span>Precip</span>', '<span>mm/hr</span>'];
        colorMap.forEach(function (colorMapEntry) {
            labels.push('<span style="background:' + colorMapEntry.color + '"></span>' + colorMapEntry.value);
        });
        return labels.join("<br>");
    }

    useEffect(() => {
        const legend = L.control({position: "bottomleft"});
        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "map-info legend");
            div.innerHTML = createLegendItemsHtml();
            return div;
        }

        const {map} = props.leaflet;
        legend.addTo(map);
    }, []);

    return <div/>;
}

export default withLeaflet(Legend);