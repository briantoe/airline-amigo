import React, { Component } from 'react';
import './Movie.css';
import {populateMovies} from './populateMovies';

/*export default (props) => {
    return (
    <div className="PlayerContainer"> 
        <video controls autoPlay src="http://10.204.106.148:8080/videos/bigbuckbunny.mp4" className="video" />
    </div>
    );
  };
  */

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

    render(){

        let movies = this.state.movies.map((movie) => (
            <li key={movie.id}><Movie title={movie.title} desc={movie.desc} thumbnail={movie.thumbnail}></Movie>
            </li>
        ));

        return(
           // <div>
            //    {movies}
            //</div>

            <div>
                <ul>
                        {movies}
                </ul>
            </div> 
        );
    }
}

class Movie extends Component {
    render() {
        return(
            <div>
                <img src={this.props.thumbnail} />
                <h3>{this.props.title}</h3>
                <p>{this.props.desc}</p>
            </div>
        );
    }
}