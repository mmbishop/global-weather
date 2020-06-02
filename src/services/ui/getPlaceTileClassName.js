import {convertTemperature} from "../weather";

export const getPlaceTileClassName = (currentTemp, displayUnits) => {
    let temp = currentTemp;
    if (displayUnits === "metric") {
        temp = convertTemperature(currentTemp, "metric", "imperial");
    }
    let roundedTemp = Math.round(temp);
    if (roundedTemp >= 90.0) {
        return "hot";
    }
    else if (roundedTemp >= 70.0 && roundedTemp < 90.0) {
        return "warm";
    }
    else if (roundedTemp >= 40.0 && roundedTemp < 70.0) {
        return "cool";
    }
    else if (roundedTemp >= 0.0 && roundedTemp < 40.0) {
        return "cold";
    }
    else if (roundedTemp < 0.0) {
        return "frigid";
    }
    return "undefined-temp";
}

export default getPlaceTileClassName;
