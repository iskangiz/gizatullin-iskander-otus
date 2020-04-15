import {CityModel} from "./City"

export class DataApi {
    constructor() {
    }
    getCities ( ) : Array<CityModel> {
        let result : Array<CityModel> = [];
        result.push(new CityModel(1, "Moscow"));
        result.push(new CityModel(2, "Kazan"));
        result.push(new CityModel(3, "Tokyo"));
        return result;
    }
}