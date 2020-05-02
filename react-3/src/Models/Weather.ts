export class WeatherModel {
    id: number;
    date: string;
    temp: number;
    tempFeelsLike: number;
    pressure: number;
    humidity: number;
    clouds: number;
    windSpeed: number;
    icon: string;

    constructor(id: number,
                date: string,
                temp: number,
                tempFeelsLike: number,
                pressure: number,
                humidity: number,
                clouds: number,
                windSpeed: number,
                icon: string) {
        this.id = id;
        this.date = date;
        this.temp = temp;
        this.tempFeelsLike = tempFeelsLike;
        this.pressure = pressure;
        this.humidity = humidity;
        this.clouds = clouds;
        this.windSpeed = windSpeed;
        this.icon = icon;
    }
}