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

export default (placeName) => (
window.fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${process.env.REACT_APP_GOOGLE_MAPS_CLIENT_ID}`)
    .then(res => res.json())
    .then((result) => {
        if (result.results && result.results.length > 0) {
            const lat = result.results[0].geometry.location.lat;
            const lng = result.results[0].geometry.location.lng;
            let name;
            let adminLevel1;
            let country;
            for (let i = 0; i < result.results[0].address_components.length; i++) {
                let addressComponentType = result.results[0].address_components[i].types[0];
                if (addressComponentType === "locality" || addressComponentType === "colloquial_area") {
                    name = result.results[0].address_components[i].long_name;
                } else if (addressComponentType === "administrative_area_level_1") {
                    adminLevel1 = result.results[0].address_components[i].short_name;
                } else if (addressComponentType === "country") {
                    country = result.results[0].address_components[i].short_name;
                    if (! name) {
                        name = result.results[0].address_components[i].long_name;
                    }
                }
            }
            if (!name) {
                name = adminLevel1;
            }
            return ({lat: lat, lng: lng, name: name, adminLevel1: adminLevel1, country: country});
        }
        return Promise.reject();
    }));
