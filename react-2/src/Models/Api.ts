import {CityModel} from "./City"
import {WeatherModel} from "./Weather"

export class DataApi {
    constructor() {
    }

    getCities(): Array<CityModel> {
        let result: Array<CityModel> = [];
        result.push(new CityModel(1, "Москва"));
        result.push(new CityModel(2, "Казань"));
        result.push(new CityModel(3, "Токио"));
        return result;
    }

    getWeather(cities: Array<CityModel>): Array<WeatherModel> {
        let result: Array<WeatherModel> = [];
        let weatherModel: WeatherModel;
        let iconsArray = ['04d.png', '09d.png', '13d.png'];

        cities.forEach(c => {
            let icon = iconsArray[c.id] !== undefined ? iconsArray[c.id] : iconsArray[0];
            result.push(new WeatherModel(c.id, c.name, 15 + c.id, 17 + c.id, 741 + c.id, 93 + c.id, 90 + c.id, 2.1 + c.id, icon));
        });
        return result;
    }
}