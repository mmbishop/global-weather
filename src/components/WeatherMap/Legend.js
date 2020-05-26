import {MapControl, withLeaflet} from "react-leaflet";
import L from "leaflet";

class Legend extends MapControl {
    createLeafletElement(props) {}

    componentDidMount() {
        const getColor = (d) => {
            return d >= 100.0
            ? "#bb0000"
            : d >= 50.0
            ? "#f70000"
            : d >= 25.0
            ? "#fe3f00"
            : d >= 20.0
            ? "#fe8b00"
            : d >= 15.0
            ? "#fed300"
            : d >= 10.0
            ? "#d9fe1b"
            : d >= 7.5
            ? "#9bfe63"
            : d>= 5.0
            ? "#4ffdaf"
            : d >= 2.5
            ? "#07fdf7"
            : d >= 1.0
            ? "#00adfd"
            : d >= 0.5
            ? "#004ffd"
            : d >= 0.25
            ? "#0000f7"
            : d >= 0.10
            ? "#0000bb"
            : "#000000";
        };

        const legend = L.control({ position: "bottomleft" });
        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "map-info legend");
            const levels = [100.0, 50.0, 25.0, 20.0, 15.0, 10.0, 7.5, 5.0, 2.5, 1.0, 0.5, 0.25, 0.1];
            let labels = ['<span>Precip<br/>mm/hr</span>'];
            for (let i = 0; i < levels.length; i++) {
                labels.push('<i style="background:' + getColor(levels[i]) + '"></i> ' + levels[i]);
            }
            div.innerHTML = labels.join("<br>");
            return div;
        }

        const { map } = this.props.leaflet;
        legend.addTo(map);
    }

    componentWillUnmount() {
    }

}

export default withLeaflet(Legend);