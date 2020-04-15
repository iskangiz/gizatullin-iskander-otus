import React from 'react';
import {CitySelect} from "./CitySelect";

export class WeatherApp extends React.Component {
    constructor() {
        super();
        this.state = {cityInput : ""};
        this.handleCityInputChange = this.handleCityInputChange.bind(this);
    }

    handleCityInputChange(inputChange) {
        this.setState({
            cityInput: inputChange
        })
    }

    render() {
        return (
            <div>
                <h1>Weather App</h1>
                <CitySelect/>
                {/*<CityInput input={this.state.cityInput} onTextChange={this.handleCityInputChange}/>*/}
                {/*<h3>Chosen city {this.state.cityInput}</h3>*/}
            </div>
        );
    }
}