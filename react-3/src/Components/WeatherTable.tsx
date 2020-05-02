import React from 'react';
import { connect } from 'react-redux'
import {WeatherTableRow} from "./WeatherTableRow";
import {WeatherTableHeader} from "./WeatherTableHeader"
import {loadWeatherTable} from "../Actions/actionsCreators";
import { Link } from "react-router-dom";

class WeatherTable extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadWeatherTable(this.props.match.params.id);
    }

    render() {
        let trs = this.props.weather.map((w) =>
            <WeatherTableRow data={w}></WeatherTableRow>
        );

        return (
            <div>
                <Link to={`/`}>Вернуться к списку городов</Link>
                <h2>{(this.props.weatherCity !== undefined) ? this.props.weatherCity.name : ""}</h2>
                <table class="tbl">
                    <WeatherTableHeader/>
                    {trs}
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weather: state.weather,
        weatherCity: state.weatherCity
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadWeatherTable: (cityId: number) => dispatch(loadWeatherTable(cityId))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeatherTable)