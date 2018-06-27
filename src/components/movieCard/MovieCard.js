import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import _get from 'lodash/get';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';

//Actions
import {
  fetchMovieDetails,
  onShowLoginPage,
} from '../../actions';

//api
import {
  addToWatchList
} from '../../api/movieApi';

//Styles
import './MovieCard.css';

const tickIconUrl = 'http://www.clker.com/cliparts/2/k/n/l/C/Q/transparent-green-checkmark-md.png';

class MovieCard extends Component {

  state = {
    addedToWatchList: false,
  };

  componentWillMount() {
    const {
      movieId,
      movieDetails,
      loadingDetails = {},
      } = this.props;

    if (movieId && _isEmpty(movieDetails[movieId]) && !loadingDetails[movieId]) {
      this.props.fetchMovieDetails(movieId);
    }
  }

  onClickAddToWatchList = () => {
    const sessionId = localStorage.sessionId;

    if (sessionId) {
      addToWatchList(this.props.movieId).then(() => {
        this.setState({
          addedToWatchList: true,
        })
      });
    } else {
      this.props.onShowLoginPage();
    }
  }

  render() {
    const {
      movieId,
      name,
      posterUrl,
      description,
      releaseDate,
      baseUrl,
      posterSize,
      movieDetails,
      watchListMovies,
      } = this.props;

    const poster = `${baseUrl}/${posterSize}/${posterUrl}`;
    const currentMovieDetails = _get(movieDetails, movieId, {});
    const productionCompany = _get(currentMovieDetails, 'production_companies.0.name', '');
    const director = _find(_get(currentMovieDetails, 'credits.crew', []), {job: 'Director'});
    const casts = _get(currentMovieDetails, 'credits.cast', []).slice(0, 4);
    const isAddedToWatchList = this.state.addedToWatchList || !_isEmpty(_filter(watchListMovies, {id: movieId}));
    
   
    return (
      <div className="movie-section__card">
        <div className="movie-section__card-body">
          <div className="movie-section__poster"><img alt="poster" className="movie-section__poster-img" src={poster}/></div>
          <div className="movie-section__info">
            <div className="movie-section__card-info__title">{name}</div>
            <div className="movie-section__card-info__description">{description}</div>
            <div className="movie-section__card-info__release">Release Date: {releaseDate}</div>
            {!_isEmpty(casts) &&
            <div className="movie-section__card-info__casts"><strong> Stars:</strong> {casts.map(cast =>
              <span>{`${cast.name}, `} </span>)}</div>}
            {director &&
            <div className="movie-section__card-info__director"><strong>Director:</strong> {director.name}</div>}
            {productionCompany &&
            <div className="movie-section__card-info__production"><strong>Production House:</strong> {productionCompany}
            </div>}
          </div>
        </div>
        <div className="movie-section__card-footer">
          {isAddedToWatchList ? <div className="movie-section__card-footer__action"><img className="watch-list__tick" alt="tick" src={tickIconUrl}/>Added</div> : <div className="movie-section__card-footer__action" onClick={this.onClickAddToWatchList}>Add to Watchlist</div>}
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movieId: PropTypes.string,
  name: PropTypes.string,
  posterUrl: PropTypes.string,
  description: PropTypes.string,
  releaseDate: PropTypes.string,
  baseUrl: PropTypes.string,
  posterSize: PropTypes.string,
  movieDetails: PropTypes.object,
  fetchMovieDetails: PropTypes.func,
  fetchMovieCredits: PropTypes.func,
};

const mapStateToProps = ({ movies: { movieDetails = {}, watchListMovies, loadingDetails}}) => ({
  movieDetails,
  watchListMovies,
  loadingDetails
});

export default connect(
  mapStateToProps, {
    fetchMovieDetails,
    onShowLoginPage,
  }
)(MovieCard);

