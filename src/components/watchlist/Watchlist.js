import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
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
    if (_isEmpty(this.props.watchListMovies)) {
      return (
        <div>
          <img src="https://i.pinimg.com/736x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2---page-empty-page.jpg" alt="logo" />
        </div>
      )
    }

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
  baseUrl: PropTypes.string,
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

