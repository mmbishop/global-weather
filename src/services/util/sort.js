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

export const getSortedPlaces = (places, sortProperty, sortOrder) => {
    switch (sortProperty) {
        case "name":
            return places.sort((a, b) => sortOrder === "ascending" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        case "temperature":
            return places.sort((a, b) => sortOrder === "ascending" ? a.temperature - b.temperature : b.temperature - a.temperature);
        case "conditions":
            return places.sort((a, b) => sortOrder === "ascending" ? a.conditions.localeCompare(b.conditions) : b.conditions.localeCompare(a.conditions));
        case "humidity":
            return places.sort((a, b) => sortOrder === "ascending" ? a.humidity - b.humidity : b.humidity - a.humidity);
        case "windSpeed":
            return places.sort((a, b) => sortOrder === "ascending" ? a.windSpeed - b.windSpeed : b.windSpeed - a.windSpeed);
        default:
            return places;
    }
}
