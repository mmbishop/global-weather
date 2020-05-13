import React from 'react';

export class Temperature extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }

    render() {
        return (
            <div className={"weather"}>{this.state.value}<span>°F</span></div>
        );
    }

}