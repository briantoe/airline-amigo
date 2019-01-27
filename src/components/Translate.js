
import React, { Component } from 'react';

import './Translate.css';
import langs from './languages';

const axios = require('axios');


class Translate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      recording: false,
      // passengerSubtitles: [],
      // attendantSubtitles: [],
      subtitles: [],
      interimTranscript: '',
      value: true,
      lang: 'en-US', // english is default language in the list
      speaker: ''
    };


    // Speech
    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.onresult = this.onTranscript;

    // Synthesis
    this.synth = window.speechSynthesis;


  }

  render() {
    let langList = langs.map(lang => (
      <option value={lang.code} key={lang.code}>{lang.name}</option>
    ));


    return (
      <div className="Translate">
        <header className="Translate-header">
          <u>Translation application</u>
          <div>
            <button disabled={!this.state.value} onMouseUp={this.stopRecording} onMouseDown={this.record} name='attendant' className='button button-left'>
              <b>
                Attendant
           </b>
            </button>


            <button disabled={!this.state.value} onMouseUp={this.stopRecording} onMouseDown={this.record} name='passenger' className='button button-right'>
              <b>
                Passenger
             </b>
            </button>
          </div>

          <div>
            <span>Language: </span>
            <select value={this.state.lang} onChange={this.handleChange}>
              {langList}
            </select>

          </div>


        </header>
      </div >
    );

  }



  // funcs



  handleChange = (event) => {
    console.log("lang change event");
    console.log(event.target.value);
    this.setState({
      lang: event.target.value
    });

  }


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
    }, 2000);

  }

  // Toggle muting mic
  record = (event) => {
    this.recognition.start();
    console.log("recording");

    this.setState({
      recording: true

    });
    let buttonPressed = event.target.innerText;

    if (buttonPressed === "Passenger") {
      console.log("passenger pressed");
      this.setState({
        speaker: this.state.lang
      });
    }
    else if (buttonPressed === "Attendant") {
      console.log('attendant pressed');
      this.setState({
        speaker: 'en-US'
      });
    }

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
      subtitles: this.state.subtitles.concat(transcript)
    });
    let text = transcript[0].translatedText;

    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.state.lang;
    this.synth.speak(utterance);
  }

  onTranscript = (event) => {
    console.log("on transcript");
    console.log(event.results);
    let results = event.results;
    this.setState({
      interimTranscript: ''
    })
    for (let i = event.resultIndex; i < results.length; ++i) {
      let transcript = results[i][0].transcript;

      if (results[i].isFinal) {
        console.log(transcript);

        if (this.state.speaker === this.state.lang) // you're not even translating into another language :thinking:
          return;

        if (this.state.speaker === 'en-US') {
          let truncated = this.state.lang;
          truncated = truncated.substring(0, 2);
          translate(transcript, truncated, 'en', this.receivedTranslation);
        }
        else {
          let truncated = this.state.speaker;
          truncated = truncated.substring(0, 2)
          translate(transcript, 'en', truncated, this.receivedTranslation);
        }        // setTimeout(() => {
        //   console.log('timeout');
        //   let transcripts = this.state.subtitles;
        //   for (let i = 0; i < transcripts.length; i++) {
        //     if (transcripts[i] === transcript) {
        //       transcripts.splice(i, 1);
        //     }
        //   }


        //   this.setState({
        //     subtitles: transcripts
        //   });
        // }, 5000);

      } else {
        this.setState({
          interimTranscript: this.state.interimTranscript + transcript + ' '
        });
      }
    }
  }

}

const translate = (text, targetLang, sourceLang, callback) => {
  let token = process.env.REACT_APP_TRANSLATION_API_KEY;

  axios.post('https://translation.googleapis.com/language/translate/v2?key=' + token, {
    q: text,
    target: targetLang,
    source: sourceLang
  }).then(res => {
    console.log(res.data.data.translations);
    callback(res.data.data.translations)
  })
    .catch(err => {
      console.log(err.response.data);
      callback(null, err)
    });
}

export default Translate;