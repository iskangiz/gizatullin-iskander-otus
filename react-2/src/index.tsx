import React from 'react';
import ReactDOM from "react-dom";

import { WeatherApp } from "./Components/WeatherApp";

ReactDOM.render(
    <WeatherApp userName="random name"></WeatherApp>,
    document.getElementById('root')
);