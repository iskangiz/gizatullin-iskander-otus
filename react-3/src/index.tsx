import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { App } from "./Components/App";
import {createStore} from "redux";
import {reducer} from "./reducers/reducer"
import {DataApi} from "./Models/Api"

const cities = new DataApi().getCities();
const initialState = {
    cities:  cities,
    addedCities: [],
    currentCity: cities[0],
    weather: []
};

let store = createStore(reducer, initialState);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);