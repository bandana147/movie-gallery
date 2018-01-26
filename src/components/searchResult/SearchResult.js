import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

//components
import MovieCard from '../movieCard';

//actions
import {showHomePage} from '../../actions';

//styles
import './SearchResult.css';

import errorIcon from '../../error.svg';

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
  };

  render() {

    if (_isEmpty(this.props.movies)) {
      return <div className="search-empty"><img alt="logo" src={errorIcon}/><div>{`Sorry! movie "${this.props.keyword}" not found`}<div onClick={this.props.showHomePage} className="search__back"><strong>Go back</strong></div></div></div>
    }
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
  keyword: PropTypes.string,
  baseUrl:  PropTypes.string,
  posterSize: PropTypes.string,
};

const mapStateToProps = ({  movies: {topMovies = [], recentlyReleased = [], baseUrl={}, posterSize='', loadingMoreMovies, hasMore, }}) => ({
  topMovies,
  recentlyReleased,
  baseUrl,
  posterSize,
  loadingMoreMovies,
  hasMore,
});

export default connect(
  mapStateToProps, {
    showHomePage,
  }
)(SearchResult)

