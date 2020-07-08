import React, { Component } from 'react';
import './App.css';
import Banner from "./Banner/Banner";

class App extends Component {
    apiUrl = 'https://www.stadtluft-anzeiger.de/getTreeLEDAPIv2.php?stationid=136-ringkirche';
    apiUrlProxied = 'https://cors-anywhere.herokuapp.com/https://www.stadtluft-anzeiger.de/getTreeLEDAPIv2.php?stationid=136-ringkirche';
    state = {
        no2: null,
        time: null,
    };

    resolution = 'fullHD';
    //resolution = 'ultraHD';

    componentWillMount() {
        fetch(this.apiUrlProxied)
        .then(res => res.json())
        .then(json => this.setState({ no2: json.NO2, time: json.time }))
        .catch(e => console.log(e))
    }

    render() {
        const { no2, time } = this.state;

        return (
            <div className={`App ${this.resolution}`}>
                {!no2 && <h1 className='loadingTitle'>LOADING...</h1>}
                <Banner className={this.resolution} time={time} no2={no2} />
            </div>
        );
    }
}

export default App;
