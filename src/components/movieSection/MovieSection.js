import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import _get from 'lodash/get';

//components
import MovieCard from '../movieCard';

//styles
import './MovieSection.css';

class MovieSection extends Component {

  renderMovies = movie => {
    const {
      baseUrl,
      posterSize,
      } = this.props;

   return (
     <MovieCard
       movieId={movie.id}
       baseUrl={baseUrl}
       posterSize={posterSize}
       name={movie.title}
       description={movie.overview}
       releaseDate={movie.release_date}
       posterUrl={movie.poster_path}
     />
   );
  };

  render() {
    const movieNodes = _get(this.props, 'movies', []).map(this.renderMovies);
    const toLink = `/${this.props.type}`;

    return (
      <div className="movie-section">
        <div className="movie-section__header">
          <h3 className="movie-section__title">{this.props.sectionName}</h3>
        </div>
        <div className="movie-section__body">
          {movieNodes}
        </div>
        <div className="view-more" onClick={this.props.onClickViewMore}><Link to={toLink}>View More</Link></div>
      </div>
    );
  }
}

MovieSection.propTypes = {
  sectionName: PropTypes.string,
  movies: PropTypes.array,
  onClickViewMore: PropTypes.func,
};

export default MovieSection;

