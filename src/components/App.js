import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Home from './Home';
import Translate from './Translate';
import Flight from './Flight';
import Movies from './Movies';
import Movie from './Movie';

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/translate' component={Translate} />
          <Route path='/flight' component={Flight} />
          <Route exact path='/movies' component={Movies} />
          <Route path='/movies/:id' component={Movie} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
