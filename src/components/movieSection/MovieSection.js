import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _get from 'lodash/get';
import axios from 'axios';
import './MovieSection.css';

class MovieSection extends Component {
  renderMovies = (movie, index) => {
   return (
     <div className="movie-section__card">
       <div className="movie-section__card-item number">{`#${index}`}</div>
       <div className="movie-section__card-item title">{movie.title}</div>
       <div className="movie-section__card-item popularity">{movie.popularity}</div>
     </div>
   );
  }

  render() {
    debugger
    const movieNodes = _get(this.props, 'movies', []).map(this.renderMovies);

    return (
      <div className="movie-section">
        <div className="movie-section__header">
          <h3 className="movie-section__title">{this.props.sectionName}</h3>
        </div>
        <div className="movie-section__body">
          <div className="movie-section__body-title">
            % OF TOP 10 PAGE VIEWS
          </div>
          {movieNodes}
        </div>
      </div>
    );
  }
}

MovieSection.propTypes = {
  sectionName: PropTypes.string,
  movies: PropTypes.array,
};

export default MovieSection;

