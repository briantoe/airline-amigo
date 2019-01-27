import React, { Component } from 'react';
import axios from 'axios';
import url from 'url';

import './Movies.css';

const populateMovies = (callback) => {
  axios.get(url.resolve(process.env.REACT_APP_MEDIA_SERVER, '/movies'))
  .then(res => {
    console.log(res.data);
    callback(res.data)
  })
  .catch(err =>{
    console.log(err.response);
    callback(null, err)
  });
}

export default class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    populateMovies((res) => {
      this.setState({
        movies: res
      });
    });
  }

  render() {

    let movies = this.state.movies.map((movie) => (
      <li key={movie.id} className="movieList"><Movie title={movie.title} desc={movie.desc} thumbnail={movie.thumbnail}></Movie>
      </li>
    ));

    return (
      <div className="moviesDiv">
        <ul className="unList">
          {movies}
        </ul>
      </div>
    );
  }
}

class Movie extends Component {
  render() {
    return (
      <div>
        <img src={this.props.thumbnail} />
        <h3>{this.props.title}</h3>
        <p>{this.props.desc}</p>
      </div>
    );
  }
}