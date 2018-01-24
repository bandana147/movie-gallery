import PropTypes from 'prop-types';
import React, { Component } from 'react';

//utilities
import _get from 'lodash/get';

//components
import MovieCard from '../movieCard';

//styles
import './SearchResult.css';

class SearchResult extends Component {

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
  }

  render() {
    const movieNodes = _get(this.props, 'movies', []).map(this.renderMovies);

    return (
      <div className="search-result">
        <div className="go-back" onClick={this.props.goBackHome}>{`<-- Go back to Home`}</div>
        <div className="movie-section__header">
          <span className="movie-section__title">Search Result for "{this.props.keyword}"</span>
        </div>
        <div className="movie-section__body">
          {movieNodes}
        </div>
      </div>
    );
  }
}

SearchResult.propTypes = {
  sectionName: PropTypes.string,
  movies: PropTypes.array,
  goBackHome: PropTypes.func,
};

export default SearchResult;

