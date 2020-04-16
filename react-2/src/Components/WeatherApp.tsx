import React from 'react';
import {CitySelect} from "./CitySelect";
import  {WeatherTable} from "./WeatherTable";

export class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {citiesToShow: []};
        this.handleCityInputChange = this.handleCityInputChange.bind(this);
    }

    handleCityInputChange(cities) {
        this.setState({
            citiesToShow: cities
        })
    }

    render() {
        return (
            <div>
                <h1>Weather App</h1>
                <CitySelect onCitiesToShowChanged={this.handleCityInputChange}/>
                <WeatherTable citiesToShow={this.state.citiesToShow} />
            </div>
        );
    }
}