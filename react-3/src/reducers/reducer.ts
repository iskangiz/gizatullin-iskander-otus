import {DataApi} from "../Models/Api";
import {addOrRemoveCurrentCityFromAdded} from "../Actions/actionsCreators";


export function reducer(state, action) {
    console.log(action.type);
    switch (action.type) {
        case 'ADD_OR_REMOVE_CURRENT_CITY_FROM_ADDED':
            if (state.currentCity === undefined) {
                return {
                    ...state
                };
            }
            let indexOf = state.addedCities.findIndex(a => a.id == state.currentCity.id);
            if (action.payload) {
                if (indexOf < 0) {
                    return {
                        ...state,
                        addedCities:  [...state.addedCities, state.currentCity]
                    };
                } else {
                    return {
                        ...state
                    };
                }
            } else {
                let newAddedCities = state.addedCities.filter(a=>a.id != state.currentCity.id);
                return {
                    ...state,
                    addedCities:  newAddedCities
                };
            }
        case 'SELECT_CURRENT_CITY':
            let currentCity = state.cities.find(c => c.id == action.payload);
            return  {
                ...state,
                currentCity: currentCity
            };
        case 'LOAD_WEATHER_TABLE':
            let api = new DataApi();
            let weather = api.getWeather(action.payload);
            let weatherCity = api.getCity(action.payload);
            return {
                ...state,
                weather: weather,
                weatherCity: weatherCity
            };
        default:
            return state
    }
}