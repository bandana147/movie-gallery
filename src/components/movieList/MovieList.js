import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

//Components
import MovieCard from '../movieCard';

//Actions
import {
  fetchMovies,
  fetchBaseConfigs,
} from '../../actions';

//Styles
import './MovieList.css';
import loaderIcon from '../../spinner-loader.svg';

const MOVIE_TYPE_LABEL = {
  top_rated: 'Top Rated Movies',
  now_playing: 'Recently Released Movies',
};

const MOVIE_TYPE_KEY = {
  top_rated: 'topMovies',
  now_playing: 'recentlyReleased',
};

class MovieList extends Component {

  state = {
    movieType: '',
  };

  componentWillMount() {
    const movieType = (_get(this.props, 'location.pathname', '')).replace(/\//g, '');
    if (_isEmpty(this.props.baseUrl)) {
      this.props.fetchBaseConfigs();
    }

    if (_isEmpty(_get(this.props, `${MOVIE_TYPE_KEY[movieType]}.movies`))) {
      this.props.fetchMovies(movieType);
    }

    this.setState({
      movieType,
    });
  }



  onClickViewMore = () => {

  }

  onScrollBody = (event) => {
    const {
      movieType
    } = this.state;
    const { hasMore, loadingMovies } = this.props[MOVIE_TYPE_KEY[this.state.movieType]];

    const contentBody = event.target;

    if (contentBody.scrollTop === (contentBody.scrollHeight - contentBody.offsetHeight)) {
      if (!loadingMovies && hasMore) {
        this.props.fetchMovies(movieType, true);
      }
    }
  };

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

    const {
      movies = [],
      loadingMoreMovies,
    } = _get(this.props, `${MOVIE_TYPE_KEY[this.state.movieType]}`, {});
    
    const movieNodes = movies.map(this.renderMovies);

    return (
      <div className="movie-list">
        <header className="home-screen__header">
          <div className="home-screen__header-items">
            <Link to={'/'}><h1 className="home-screen__title">Movie Gallery</h1></Link>
          </div>
        </header>
        <div className="movie-list__body">
          <div className="movie-list__header">
            <div className="go-back"><Link to={'/'}>{`<-- Go back to Home`}</Link></div>
            <h3 className="movie-list__title">{MOVIE_TYPE_LABEL[this.state.movieType]}</h3>
          </div>
          <div className="movie-list__list" onScroll={this.onScrollBody}>
            {movieNodes}
          </div>
          {loadingMoreMovies && <div className="movie-list__view-more"><img className="movie_list-loader-spinner" src={loaderIcon} alt="loader" /></div>}
        </div>
      </div>
    );
  }
}

MovieList.propTypes = {
  topMovies: PropTypes.object,
  recentlyReleased: PropTypes.object,
  baseUrl: PropTypes.string,
  posterSize: PropTypes.string,
  loadingMovies: PropTypes.bool,
  hasMore: PropTypes.bool,
  fetchMovies: PropTypes.func,
  fetchBaseConfigs: PropTypes.func,
};

const mapStateToProps = ({ movies: { topMovies = [], movieDetails, recentlyReleased = [], baseUrl = {}, posterSize = '', loadingMoreMovies, hasMore } }) => ({
  topMovies,
  recentlyReleased,
  baseUrl,
  posterSize,
  loadingMoreMovies,
  hasMore,
  movieDetails
});

export default connect(
  mapStateToProps, {
    fetchMovies,
    fetchBaseConfigs,
  }
)(MovieList)
