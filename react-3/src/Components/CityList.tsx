import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

const CityList = ({cities}) => {
    let optionItems = cities.map((city) =>
        <li><Link to={`/city/${city.id}`}>{city.name}</Link></li>
    );
    return (
        <ul>
            {optionItems}
        </ul>
    );
};

const mapStateToProps = (state) => {
    return {
        cities: state.addedCities
    }
};

export default connect(
    mapStateToProps,
)(CityList)
