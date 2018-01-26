import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import _get from 'lodash/get';

//components
import MovieCard from '../movieCard';

//Actions
import {
  fetchWatchList,
} from '../../actions';


//styles
import './Watchlist.css';

class Watchlist extends Component {

  componentWillMount() {
    this.props.fetchWatchList();
  }

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
    const movieNodes = _get(this.props, 'watchListMovies', []).map(this.renderMovies);

    return (
      <div className="watch-list">
        <div className="go-back" onClick={this.props.goBackHome}>{`<-- Go back to Home`}</div>
        <div className="movie-section__header">
          <span className="movie-section__title">My Watchlist</span>
        </div>
        <div className="movie-section__body">
          {movieNodes}
        </div>
      </div>
    );
  }
}

Watchlist.propTypes = {
  goBackHome: PropTypes.func,
  baseUrl:  PropTypes.string,
  posterSize: PropTypes.string,
};

const mapStateToProps = ({ movies: { watchListMovies }}) => ({
  watchListMovies
});

export default connect(
  mapStateToProps, {
    fetchWatchList,
  }
)(Watchlist);

