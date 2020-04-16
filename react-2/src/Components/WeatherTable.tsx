import React from 'react';

export class WeatherTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {citiesToShow: this.props.citiesToShow};
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onTextChange(e.target.value);
    }

    render() {
        let addedCities = this.props.citiesToShow;
        let addedCitiesSpan = addedCities.map((city) =>
            <span>{city.name}</span>
        );

        return (
            <div>
                {addedCitiesSpan}
            </div>
        );
    }
}