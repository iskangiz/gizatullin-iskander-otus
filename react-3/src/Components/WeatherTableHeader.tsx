import React from 'react';

export class WeatherTableHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <th>Дата</th>
                <th class="iconTh"></th>
                <th>Teмпература</th>
                <th>Температура (по ощущениям)</th>
                <th>Давление (мм. рт. с)</th>
                <th>Влажность (%)</th>
                <th>Облачность (%)</th>
                <th>Скорость ветра (м/с)</th>
            </tr>
        );
    }
}