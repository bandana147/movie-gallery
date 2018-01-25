import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {connect} from 'react-redux';

import _get from 'lodash/get';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';

//Actions
import {
  fetchMovieDetails,
  fetchMovieCredits,
} from '../../actions';

//Styles
import './MovieCard.css';

class MovieCard extends Component {

  componentWillMount() {
    const {
      movieId,
      movieCredits,
      movieDetails,
      } = this.props;
    const currentCredits = _find(movieCredits, {id: movieId}, {});
    const currentDetails = _find(movieDetails, {id: movieId}, {});

    if (movieId && _isEmpty(currentCredits)) {
      this.props.fetchMovieCredits(movieId);
    }

    if (movieId && _isEmpty(currentDetails)) {
      this.props.fetchMovieDetails(movieId);
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
      movieCredits,
      } = this.props;

    const poster = `${baseUrl}/${posterSize}/${posterUrl}`;
    const productionCompany = _get(_find(movieDetails, {id: movieId}), 'production_companies.0.name', '');
    const currentCredits = _find(movieCredits, {id: movieId}, {});
    const director = _find(_get(currentCredits, 'crew', []), {job: 'Director'});
    const casts = _get(currentCredits, 'cast', []).slice(0, 4);

    return (
      <div className="movie-section__card">
        <div className="movie-section__card-body">
          {poster &&
          <img alt="poster" className="movie-section__poster movie-section__poster-img" src={poster}/> }
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
          <div className="movie-section__card-footer__action">Add to Watchlist</div>
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
  movieCredits: PropTypes.object,
  fetchMovieDetails: PropTypes.func,
  fetchMovieCredits: PropTypes.func,
};

const mapStateToProps = ({ movies: { movieDetails = {}, movieCredits = []}}) => ({
  movieDetails,
  movieCredits,
});

export default connect(
  mapStateToProps, {
    fetchMovieDetails,
    fetchMovieCredits,
  }
)(MovieCard);

