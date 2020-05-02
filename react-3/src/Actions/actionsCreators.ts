const ADD_OR_REMOVE_CURRENT_CITY_FROM_ADDED = 'ADD_OR_REMOVE_CURRENT_CITY_FROM_ADDED';

const SELECT_CURRENT_CITY = 'SELECT_CURRENT_CITY';

const LOAD_WEATHER_TABLE = 'LOAD_WEATHER_TABLE'

export function addOrRemoveCurrentCityFromAdded(checked:boolean) {
    return {
        type: ADD_OR_REMOVE_CURRENT_CITY_FROM_ADDED,
        payload: checked
    }
}

export function selectCurrentCity(cityId: number) {
    return {
        type: SELECT_CURRENT_CITY,
        payload: cityId
    }
}

export function loadWeatherTable(cityId: number) {
    return {
        type: LOAD_WEATHER_TABLE,
        payload: cityId
    }
}