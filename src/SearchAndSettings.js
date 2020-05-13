import React from 'react';
import {SearchField} from './SearchField';
import {SettingsIcon} from "./SettingsIcon";
import Row from "react-bootstrap/Row";

export class SearchAndSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = { onChange: props.onChange };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(searchText) {
        this.state.onChange(searchText);
    }

    render() {
        return (
            <Row>
                <SearchField onChange={this.handleSearch}/>
                <SettingsIcon/>
            </Row>
        );
    }

}