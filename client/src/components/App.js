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

          <ul>
          <ul><h2>Flight {this.state.flightNumber} from {this.state.originCode} to {this.state.destinationCode}</h2></ul>

          <ul className="flightList">

          <li className="flightWrap">
          <div>Speed: </div><div id="flightField"> {this.state.speed} </div>
          </li>

          <li className="flightWrap">
          <div>Altitude: </div><div id="flightField"> {this.state.altitude} </div>
          </li>

          <li className="flightWrap">
          <div>Outside Temperature: </div><div id="flightField"> {this.state.temperature} </div>
          </li>

          <li className="flightWrap">
          <div>Estimated Time Arrival: </div><div id="flightField"> {this.state.eta} </div>
          </li>

          <li className="flightWrap">
          <div>Origin Airport: </div><div id="flightField"> {this.state.originCode} </div>
          </li>

          <li className="flightWrap">
          <div>Weather At Origin: </div><div id="flightField"> {this.state.originWeather} </div>
          </li>

          <li className="flightWrap">
          <div>Destination Airport: </div><div id="flightField"> {this.state.destinationCode} </div>
          </li>

          <li className="flightWrap">
          <div>Weather At Destination: </div><div id="flightField"> {this.state.destinationWeather} </div>
          </li>

          <li className="flightWrap">
          <div>Bathroom Status: </div><div id="flightField"> {this.state.bathroomStatus} </div>
          </li>
          </ul>
          </ul>

          <div class="flightContainer">
            <div>test test test</div>
            <div>result result result</div>
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
