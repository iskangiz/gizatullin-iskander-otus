import React from 'react';
import {DataApi} from "../Models/Api"
import {CityModel} from "../Models/City"

export class CitySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            addedCities: [],
            currentCity: null
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    componentDidMount() {
        let api = new DataApi();
        let cities = api.getCities();
        this.setState({
            cities: cities,
            currentCity: cities[0]
        });
    }

    handleSelectChange(e) {
        let selectedValue = parseInt (e.target.options[e.target.selectedIndex].value);
        let selectedCity = this.state.cities.find(c => c.id == selectedValue);
        this.setState({
            currentCity: selectedCity
        });
    }

    handleCheckboxChange(e) {
        let checked = e.target.checked;
        console.log('currentCity' + this.state.currentCity.id);
        let indexOf = this.state.addedCities.findIndex(a => a.id == this.state.currentCity.id);
        if (checked) {
            if (indexOf < 0) {
                this.setState({
                    addedCities: [...this.state.addedCities, this.state.currentCity]
                });
            }
        } else {
            console.log('not checked');
            console.log('addedCitiesLength' + this.state.addedCities.length);
            console.log('indexOf' + indexOf);
            this.setState({
                addedCities: this.state.addedCities.filter(a=>a.id != this.state.currentCity.id)
            });
        }
    }

    render() {
        let cities = this.state.cities;
        let optionItems = cities.map((city) =>
            <option value={city.id}>{city.name}</option>
        );

        let addedCities = this.state.addedCities;
        let addedCitiesSpan = addedCities.map((city) =>
            <span>{city.name}</span>
        );

        let checked = this.state.addedCities.findIndex(a=>a.id==this.state.currentCity.id) >= 0;
        return (
            <div>
                <select onChange={this.handleSelectChange} >
                    {optionItems}
                </select>
                <input type="checkbox"  checked={checked} onChange={this.handleCheckboxChange}/>
                <div>
                    {addedCitiesSpan}
                </div>
            </div>
        );
    }
}