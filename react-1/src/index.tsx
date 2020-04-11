import React from 'react';
import ReactDOM from "react-dom";

class Greeter extends React.Component {
    render() {
        return (
            <h1>Hello, {this.props.userName}!</h1>
        );
    }
}

ReactDOM.render(
    <Greeter userName="random name"></Greeter>,
    document.getElementById('root')
);