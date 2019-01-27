import React, { Component } from 'react';

import './App.css';

// flight data function
import {flight} from '../flight';

class App extends Component {

  constructor(props) {
    super(props);

    // Initialize states of flight variables
    this.state = {
      flight: 0,
      speed: 0,
      altitude: 0,
      eta: 0,
      temperature: 0,
      originCode: '',
      originWeather: 0,
      destinationCode: '',
      destinationWeather: 0,
      bathroomStatus: ''
    };

  }

  // I apologize, I hate this code, but
  // James likes lists
  render() {

    return (
      <div className="App">
        <header className="App-header">
        <div class="aligncenter">
          <div>
              <h2> Flight {this.state.flight} from {this.state.originCode} to {this.state.destinationCode} </h2>
          </div>
          
          <div class="flightContainer">
            <div class="alignleft">
              <ul id="flightLabel">Speed: </ul>
              <ul id="flightLabel">Altitude: </ul>
              <ul id="flightLabel">Temperature: </ul>
              <ul id="flightLabel">Estimated Arrival: </ul>
              <ul id="flightLabel">Origin Airport: </ul>
              <ul id="flightLabel">Weather At Origin: </ul>
              <ul id="flightLabel">Destination Aurport: </ul>
              <ul id="flightLabel">Weather At Destination</ul>
            </div>
            <div class="alignright">
              <ul id="flightValue">{this.state.speed} </ul>
              <ul id="flightValue">{this.state.altitude} </ul>
              <ul id="flightValue">{this.state.temperature} </ul>
              <ul id="flightValue">{this.state.eta} </ul>
              <ul id="flightValue">{this.state.originCode} </ul>
              <ul id="flightValue">{this.state.originWeather} </ul>
              <ul id="flightValue">{this.state.destinationCode} </ul>
              <ul id="flightValue">{this.state.destinationWeather} </ul>
            </div>
          </div>
        </div>

        </header>
  
        {this.state.speed}
      </div >
    );

  }

  // GET flight information
  componentDidMount() {
    flight((res) => {
      this.setState({
        flight: res[0].flightNumber,
        speed: res[0].speed,
        altitude: res[0].altitude,
        temperature: res[0].temperature,
        eta: res[0].eta,
        originCode: res[0].originCode,
        originWeather: res[0].originWeather,
        destinationCode: res[0].destinationCode,
        destinationWeather: res[0].destinationWeather,
        bathroomStatus: res[0].bathroomStatus
      })
    });
  }
}

export default App;
