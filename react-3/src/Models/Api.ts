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

    getCity (cityId: number) {
        let cities = this.getCities();
        let city = cities[cityId - 1] !== undefined ? cities[cityId - 1] : null;
        return city;
    }

    getWeather(cityId: number): Array<WeatherModel> {
        let result: Array<WeatherModel> = [];
        let weatherModel: WeatherModel;
        let iconsArray = ['04d.png', '09d.png', '13d.png'];

        for (let i = 0; i < 3; i++) {
            let icon = iconsArray[cityId] !== undefined ? iconsArray[cityId] : iconsArray[0];
            weatherModel = new WeatherModel(cityId, this.getDateString(i), 15 + cityId + i, 17 + cityId + i, 741 + cityId + i, 93 + cityId + i, 90 + cityId + i, 2.1 + cityId + i, icon)
            result.push(weatherModel);
        }

        return result;
    }

    getDateString (i: number) : string {
        let date = new Date();
        let newDate =  new Date();
        newDate.setDate(date.getDate()+i);

        console.log(newDate);
        return `${newDate.getDate()}.${newDate.getMonth() + 1}`;
    }
}