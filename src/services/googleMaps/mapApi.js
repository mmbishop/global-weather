export const getMapTileUrl = () => {
    return `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${process.env.REACT_APP_GOOGLE_MAPS_CLIENT_ID}`;
}

export const getMapAttribution = () => {
    return "&copy; Google Maps";
}