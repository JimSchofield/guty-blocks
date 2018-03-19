import React from 'react';
import ReactDOM from 'react-dom';

class ReactLive extends React.Component {
    constructor() {
        super();
        this.state = {
            text: ''
        }
    }

    render() {
        return (
            <div>
                <h1>
                    React is running live in the view, but I'm starting to think this is not
                    best pratice
                </h1>
                <input 
                    type="text"
                    value={this.state.text}
                    onChange={(event) => this.setState({text: event.target.value})}
                    />
                <p>{this.state.text}</p>
            </div>
        );
    }
}

window.onload = function () {
    ReactDOM.render(
        <ReactLive />,
        document.getElementById('live-react') || null
    )
};
