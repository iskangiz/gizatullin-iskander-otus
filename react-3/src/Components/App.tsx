import React from 'react';
import CitySelect from "../Components/CitySelect";
import CityList from "../Components/CityList";
import WeatherTable from "../Components/WeatherTable";

import {
    HashRouter  as Router,
    Switch,
    Route
} from "react-router-dom";

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/City/:id/" component={WeatherTable}  />
                        <Route path="/">
                            <CitySelect />
                            <CityList />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}