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
