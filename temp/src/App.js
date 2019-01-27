import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recording: false,
      leftSubtitles: [],
      rightSubtitles: [],
      interimTranscript: ''
    };



    // // Call we started was answered
    // this.socket.on('answeredCall', this.onAnsweredCall);

    // // Call was ended
    // this.socket.on('hangup', this.onHangup);

    // // WebRTC
    // this.socket.on('offer', this.onOffer);
    // this.socket.on('answer', this.onAnswer);

    // Speech
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.onresult = this.onTranscript;

    // Synthesis
    this.synth = window.speechSynthesis;


  }

  render() {

    // no subtitles

    return (
      <div className="App">
        <header className="App-header">

          <button className='button button-left'>
            <b>
              Attendant
          </b>
          </button>
          <button className='button button-right'>
            <b>
              Customer
           </b>
          </button>

        </header >
      </div >
    );

  }



  // funcs

  // Toggle muting mic
  record = () => {
    this.recognition.start();
    this.setState({
      recording: true
    });
  }

  stopRecording = () => {
    this.recognition.stop();
    this.setState({
      recording: false
    });
  }
  receivedTranslation = (transcript) => {
    console.log('RECEIVED TRANSCRIPT:', transcript);
    this.setState({
      leftSubtitles: this.state.leftSubtitles.concat(transcript)
    });

    setTimeout(() => {
      console.log('timeout');
      let transcripts = this.state.leftSubtitles;
      for (let i = 0; i < transcripts.length; i++) {
        if (transcripts[i] === transcript) {
          transcripts.splice(i, 1);
        }
      }

      this.setState({
        leftSubtitles: transcripts
      });
    }, 5000);

    let utterance = new SpeechSynthesisUtterance(transcript);
    utterance.lang = this.props.lang;
    this.synth.speak(utterance);
  }

  onTranscript = (event) => {
    let results = event.results;
    this.setState({
      interimTranscript: ''
    })
    for (let i = event.resultIndex; i < results.length; ++i) {
      let transcript = results[i][0].transcript;
      if (results[i].isFinal) {
        this.socket.emit('transcript', transcript);
        this.setState({
          interimTranscript: '',
          rightSubtitles: this.state.rightSubtitles.concat(transcript)
        });

        setTimeout(() => {
          console.log('timeout');
          let transcripts = this.state.rightSubtitles;
          for (let i = 0; i < transcripts.length; i++) {
            if (transcripts[i] === transcript) {
              transcripts.splice(i, 1);
            }
          }

          this.setState({
            rightSubtitles: transcripts
          });
        }, 5000);
      } else {
        this.setState({
          interimTranscript: this.state.interimTranscript + transcript + ' '
        });
      }
    }
  }

}

export default App;
