import React from 'react';

export class Temperature extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: props.value, feelsLike: props.feelsLike };
    }

    render() {
        return (
            <div className={"weather"}>{this.state.value}
                <span className={"temp-unit"}>°F</span>
            </div>
        );
        // <span className={"feels-like"}>Feels like {this.state.feelsLike} °F</span>
    }

}