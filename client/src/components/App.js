import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recording: false,
      leftSubtitles: [],
      rightSubtitles: [],
      interimTranscript: '',
      value: true
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

          <button disabled={!this.state.value} onMouseUp={this.stopRecording} onMouseDown={this.record} className='button button-left'>
            <b>
              Attendant
           </b>
          </button>

        
          <button disabled={!this.state.value} onMouseUp={this.stopRecording} onMouseDown={this.record} className='button button-right'>
            <b>
              Passenger
           </b>
          </button>

          
          <Dropdown className='list language-list'><li>test</li></Dropdown>

        </header>
      </div >
    );

  }



  // funcs
  tempDisable = () => {
    this.setState({
      value: !this.state.value
    });
    console.log("buttons disabled.");
    // set time out    
    setTimeout(() => {
      this.setState({
        value: !this.state.value
      });
    }, 3000);
   
  }

  // Toggle muting mic
  record = () => {
    this.recognition.start();
    console.log("recording");

    this.setState({
      recording: true
    });


  }

  stopRecording = () => {
    this.recognition.stop();
    this.setState({
      recording: false
    });
    this.tempDisable();
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
    console.log("on transcript");
    console.log(event.results);
    let results = event.results;
    this.setState({
      interimTranscript: ''
    });
    for (let i = event.resultIndex; i < results.length; ++i) {
      let transcript = results[i][0].transcript;
      if (results[i].isFinal) {

   

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
