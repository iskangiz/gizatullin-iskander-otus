import React from 'react';

export class CityInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onTextChange(e.target.value);
    }

    render() {
        return (
            <input
                type="text"
                placeholder="Input city"
                value={this.props.input}
                onChange={this.handleFilterTextChange}></input>
        );
    }
}