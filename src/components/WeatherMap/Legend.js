import {MapControl, withLeaflet} from "react-leaflet";
import L from "leaflet";

class Legend extends MapControl {

    static colorMap = [{value: 100, color: "#bb0000"}, {value: 50, color: "#f70000"}, {value: 25, color: "#fe3f00"}, {value: 20, color: "#fe8b00"},
        {value: 15, color: "#fed300"}, {value: 10, color: "#d9fe1b"}, {value: 7.5, color: "#9bfe63"}, {value: 5, color: "#4ffdaf"},
        {value: 2.5, color: "#07fdf7"}, {value: 1, color: "#00adfd"}, {value: 0.5, color: "#004ffd"}, {value: 0.25, color: "#0000f7"},
        {value: 0.1, color: "#0000bb"}];

    static createLegendItemsHtml() {
        let labels = ['<span>Precip</span>', '<span>mm/hr</span>'];
        Legend.colorMap.forEach(function (colorMapEntry) {
            labels.push('<span style="background:' + colorMapEntry.color + '"></span>' + colorMapEntry.value);
        });
        return labels.join("<br>");
    }

    static legendItemsHtml = Legend.createLegendItemsHtml();

    createLeafletElement(props) {}

    componentDidMount() {
        const legend = L.control({ position: "bottomleft" });
        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "map-info legend");
            div.innerHTML = Legend.legendItemsHtml;
            return div;
        }

        const { map } = this.props.leaflet;
        legend.addTo(map);
    }

    componentWillUnmount() {
    }

}

export default withLeaflet(Legend);