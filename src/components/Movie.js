import React, { Component } from 'react';
import url from 'url';
import axios from 'axios';

import './Movie.css';

export default class Movie extends Component {

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    let id = this.props.match.params.id
    axios.get(url.resolve(process.env.REACT_APP_MEDIA_SERVER, '/movies/') + id)
      .then((res) => {
        this.setState(res.data);
      });
  }

  render() {
    return (
      <div className='Movie'>
        <video controls autoPlay src={this.state.file} />
        <h1>{this.state.title}</h1>
        <p>{this.state.desc}</p>
      </div>
    );
  }
}
