export const convertTemperature = (temperature, fromDisplayUnits, toDisplayUnits) => {
    if (fromDisplayUnits === "imperial" && toDisplayUnits === "metric") {
        return (temperature - 32.0) * (5.0 / 9.0);
    }
    else if (fromDisplayUnits === "metric" && toDisplayUnits === "imperial") {
        return (temperature * 1.8) + 32.0;
    }
    return temperature;
}

export const convertSpeed = (speed, fromDisplayUnits, toDisplayUnits) => {
    if (fromDisplayUnits === "imperial" && toDisplayUnits === "metric") {
        return speed * 1.6;
    }
    else if (fromDisplayUnits === "metric" && toDisplayUnits === "imperial") {
        return speed / 1.6;
    }
    return speed;
}
