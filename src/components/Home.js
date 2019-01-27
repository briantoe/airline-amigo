import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className='Links'>
        <Link to='/translate'>Translate</Link>
        <Link to='/flight'>Flight</Link>
        <Link to='/movies'>Movies</Link>
      </div>
    );
  }
}