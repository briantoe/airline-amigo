import React, { Component } from 'react';

import './App.css';

// flight data function
import {flight} from '../flight';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recording: false,
      leftSubtitles: [],
      rightSubtitles: [],
      interimTranscript: '',
      value: true,
      speed: 0,
      altitude: 0,
      eta: 0,
      temperature: 0,
      originCode: '',
      originWeather: 0,
      destinationCode: '',
      destinationWeather: 0
    };


    // Speech
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.onresult = this.onTranscript;

    // Synthesis
    this.synth = window.speechSynthesis;


  }

  render() {

    return (
      <div className="App">
        <header className="App-header">

          Speed: {this.state.speed}
          Altitude: {this.state.altitude}
          Estimated Time Arrival: {this.state.eta}
          Outside Temperature: {this.state.temperature}
          Origin Airport: {this.state.originCode}
          Weather At Origin: {this.state.originWeather}
          Destination Airport: {this.state.destinationCode}
          Weather At Destination: {this.state.destinationWeather}

        </header>
      </div >
    );

  }

  // Retrieve flight data
  componentDidMount() {
    flight(8923,"2019-01-01", (res) => {
      this.setState({
        speed: res.speed,
        altitude: res.altitude,
        eta: res.eta,
        temperature: res.temperature,
        originCode: res.originCode,
        originWeather: res.originWeather,
        destinationCode: res.destinationCode,
        destinationWeather: res.destinationWeather
      })
    });
  }
}


const axios = require('axios');


const flight = (flightnumber, date, callback) => {
  axios.get(`http://localhost:3030/currentFlight`, {
  }).then(res => {
    console.log(res.data);
    callback(res.data)
  })
  .catch(err =>{
    console.log(err.response.data);
    callback(null, err)
  });
}

module.exports = {flight};