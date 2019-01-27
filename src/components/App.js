import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Translate from './Translate';
import Flights from './Flights';
import Movies from './Movies';

import './App.css';

class App extends Component {

  render() {
    return (
      <main className='Main'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/translate' component={Translate} />
          <Route path='/flights' component={Flights} />
          <Route path='/movies' component={Movies} />
        </Switch>
      </main>
    )
  }
}

export default App;
