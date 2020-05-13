import React from "react";

export class PlaceRemoveButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isActive: false};
        this.onPlaceRemoved = props.onPlaceRemoved;
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.onPlaceRemoved();
    }

    show() {
        this.setState({isActive: true});
    }

    hide() {
        this.setState({isActive: false});
    }

    render() {
        return <div className={"close"} onClick={this.handleClick}>
            {this.state.isActive ? "x" : ""}
        </div>
    }

}