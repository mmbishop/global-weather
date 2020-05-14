import React from 'react';

export class Temperature extends React.Component {

    render() {
        return (
            <div className={"weather"}>{this.props.value}
                <span className={"temp-unit"}>°F</span>
            </div>
        );
    }

}