export const getLocationHierarchy = (adminLevel1, country) => {
    if (adminLevel1 && adminLevel1 !== "") {
        return adminLevel1 + ", " + country;
    }
    return country;
}

