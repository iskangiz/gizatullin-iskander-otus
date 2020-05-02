import React from 'react';
import { connect } from 'react-redux'
import  { addOrRemoveCurrentCityFromAdded, selectCurrentCity } from '../Actions/actionsCreators'

const CitySelect = ({cities, addedCities, currentCity, addOrRemoveCurrentCityFromAdded, selectCurrentCity}) => {
    let optionItems = cities.map((city) =>
        <option selected={currentCity.id == city.id} value={city.id}>{city.name}</option>
    );
    let checked = addedCities.findIndex(a => a.id == currentCity.id) >= 0;

    return (
        <div class="divCitySelect">
            <select onChange={(e) => handleSelectChange(e, selectCurrentCity)}>
                {optionItems}
            </select>
            <input type="checkbox" checked={checked}
                   onChange={(e) => handleCheckboxChange(e, addOrRemoveCurrentCityFromAdded)}/>
        </div>
    );
};

function handleSelectChange(e, selectCurrentCity) {
    let selectedValue = parseInt (e.target.options[e.target.selectedIndex].value);
    selectCurrentCity(selectedValue);
}

function handleCheckboxChange(e, addOrRemoveCurrentCityFromAdded) {
    let checked = e.target.checked;
    addOrRemoveCurrentCityFromAdded(checked);
}

const mapStateToProps = (state) => {
    return {
        cities: state.cities,
        addedCities: state.addedCities,
        currentCity: state.currentCity
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addOrRemoveCurrentCityFromAdded: (checked: boolean) => dispatch(addOrRemoveCurrentCityFromAdded(checked)),
        selectCurrentCity: (cityId: number) => dispatch(selectCurrentCity(cityId))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CitySelect)