import React from 'react';
import {DataApi} from "../Models/Api";
import {WeatherTableRow} from "./WeatherTableRow";
import {WeatherTableHeader} from "./WeatherTableHeader"

export class WeatherTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: []
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.citiesToShow.length != prevProps.citiesToShow.length) {
            let api = new DataApi();
            let weather = api.getWeather(this.props.citiesToShow);
            this.setState({
                weather: weather
            });
        }
    }

    render() {
        // let api = new DataApi();
        // let weather = api.getWeather(this.props.citiesToShow);
        // let trs = weather.map((w) =>
        let trs = this.state.weather.map((w) =>
            <WeatherTableRow data={w}></WeatherTableRow>
        );

        return (
            <table class="tbl">
                <WeatherTableHeader />
                {trs}
            </table>
        );
    }
}