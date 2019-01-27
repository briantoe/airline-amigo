import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

export default class Home extends Component {
  render() {

    return (
      <div className='Links'>
        <div id='translate-bg'>
          <Link to='/translate'>Tanslate</Link>
        </div>
        <div id='flight-bg'>
          <Link to='/flight'>Flight</Link>
        </div>
        <div id='movies-bg'>
          <Link to='/movies'>Movies</Link>
        </div>
      </div>
    );
  }
}