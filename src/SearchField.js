import React from 'react';
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";

export class SearchField extends React.Component {

    constructor(props) {
        super(props);
        this.state = { onChange: props.onChange };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        if (e.keyCode === 13) {
            this.state.onChange(e.target.value);
        }
    }

    render() {
        return (<Col sm={9} md={11} className="add-city">
            <FormControl type="text" placeholder="City or place name" autoComplete="off" onKeyDown={this.handleSearch}/>
        </Col>);
    }

}