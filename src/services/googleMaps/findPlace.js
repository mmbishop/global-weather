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
                }
            }
            if (!name) {
                name = adminLevel1;
            }
            return ({lat: lat, lng: lng, name: name, adminLevel1: adminLevel1, country: country});
        }
        return Promise.reject();
    }));
