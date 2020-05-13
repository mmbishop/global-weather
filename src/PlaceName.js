import React from 'react';
import PropTypes from 'prop-types';

export class PlaceName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            adminLevel1: props.adminLevel1,
            country: props.country
        };
    }

    getLocationHierarchy() {
        if (this.state.adminLevel1 && this.state.adminLevel1 !== "") {
            return this.state.adminLevel1 + ", " + this.state.country;
        }
        return this.state.country;
    }

    render() {
        return (
            <div className="city">{this.state.name}<span>{this.getLocationHierarchy()}</span></div>
        );
    }

}

PlaceName.propTypes = {
    name: PropTypes.string,
    adminLevel1: PropTypes.string,
    country: PropTypes.string
};