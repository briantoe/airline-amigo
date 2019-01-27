import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
     occupiedBathroom: true // default is UN-occupied
    };


  

  }

  render() {

    // if(this.state.occupiedBathroom)
    // {
    //   this.toggleColor();
    // }
    return (
      <div className='parent'>
        <div color='green' id='bathroom' className='bathroomOpen'>
          <p color='green'>Restroom Status</p>
        </div>
        <div className='Links'>
          <Link to='/translate'>Tanslate</Link>
          <Link to='/flight'>Flight</Link>
          <Link to='/movies'>Movies</Link>
        </div>
        
   <button onClick={this.toggleColor}>.</button>

      </div>

    );
  }

  toggleColor = () => {
    var element = document.getElementById('bathroom');
    element.classList.toggle("bathroomClosed");
  }

}