import {convertTemperature} from "../weather";

export const getBackgroundColor = (currentTemp, displayUnits) => {
    let temp = currentTemp;
    if (displayUnits === "metric") {
        temp = convertTemperature(currentTemp, "metric", "imperial");
    }
    if (temp >= 90.0) {
        return "hot";
    }
    else if (temp >= 70.0 && temp < 90.0) {
        return "warm";
    }
    else if (temp >= 40.0 && temp < 70.0) {
        return "cool";
    }
    else if (temp >= 0.0 && temp < 40.0) {
        return "cold";
    }
    else if (temp < 0.0) {
        return "frigid";
    }
    return "undefined-temp";
}

export default getBackgroundColor;
