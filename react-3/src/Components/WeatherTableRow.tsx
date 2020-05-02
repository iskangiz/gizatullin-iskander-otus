import React from 'react';
import {Image} from './Image'

export class WeatherTableRow extends React.Component {
    iconServerUrl: string;
    constructor(props) {
        super(props);
        this.iconServerUrl = 'http://openweathermap.org/img/wn/'
    }

    render() {
        const dateToFormat = new Date('1976-04-19T12:59-0500');
        let weather = this.props.data;
        if (weather !== undefined)
            return (
                <tr>
                    <td>{weather.date}</td>
                    <td><Image src={this.iconServerUrl + weather.icon}/></td>
                    <td>{weather.temp}</td>
                    <td>{weather.tempFeelsLike}</td>
                    <td>{weather.pressure}</td>
                    <td>{weather.humidity}</td>
                    <td>{weather.clouds}</td>
                    <td>{weather.windSpeed}</td>
                </tr>
            );
    }
}