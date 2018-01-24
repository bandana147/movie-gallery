import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import axios from 'axios';
import './MovieCard.css';

class MovieCard extends Component {

  state = {
    productionCompany: '',
    casts: [],
    director: ''
  }

  componentWillMount(){
    if(this.props.movieId) {
      axios.get(`https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=5d18d5ebb6703b4789dca35c9f7bb17b`)
        .then(({data}) => {
          this.setState({
            productionCompany: _get(data, 'production_companies.0.name', ''),
          })
        });
      axios.get(`https://api.themoviedb.org/3/movie/${this.props.movieId}/credits?api_key=5d18d5ebb6703b4789dca35c9f7bb17b`)
        .then(({data}) => {
          const casts = data.cast.slice(0,4);
          const director = _find(data.crew, {job: 'Director'});
          debugger
          this.setState({
            casts,
            directorName: _get(director, 'name')
          })
        });
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.movieId !== nextProps.movieId) {
      axios.get(`https://api.themoviedb.org/3/movie/${nextProps.movieId}?api_key=5d18d5ebb6703b4789dca35c9f7bb17b`)
        .then(({data}) => {
          this.setState({
            productionCompany: _get(data, 'production_companies.0.name', ''),
          })
        });
      axios.get(`https://api.themoviedb.org/3/movie/${nextProps.movieId}/credits?api_key=5d18d5ebb6703b4789dca35c9f7bb17b`)
        .then(({data}) => {
          debugger
          this.setState({
            movieDetails: data.results,
          })
        });
    }
  }

  getStyle = url => (url ? {
    backgroundImage: `url(${url})`,
  } : {});


  render() {
    const {
      name,
      posterUrl,
      description,
      releaseDate,
      baseUrl,
      posterSize,
      } = this.props;
    const {
      productionCompany,
      directorName,
      casts,
      } = this.state;
    const poster = `${baseUrl}/${posterSize}/${posterUrl}`;

    return (
      <div className="movie-section__card">
        <div className="movie-section__card-body">
          {poster && <div className="movie-section__poster movie-section__poster-img" style={this.getStyle(poster)}></div>}
          <div className="movie-section__info">
            <div className="movie-section__card-info__title">{name}</div>
            <div className="movie-section__card-info__description">{description}</div>
            <div className="movie-section__card-info__release">Release Date: {releaseDate}</div>
            {!_isEmpty(casts) && <div className="movie-section__card-info__casts"><strong> Stars:</strong> {this.state.casts.map(cast => <span>{`${cast.name}, `} </span>)}</div>}
            {directorName && <div className="movie-section__card-info__director"><strong>Director:</strong> {directorName}</div>}
            {productionCompany && <div className="movie-section__card-info__production"><strong>Production House:</strong> {productionCompany}</div>}
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
  name: PropTypes.string,
  posterUrl: PropTypes.string,
  description: PropTypes.string,
  releaseDate: PropTypes.datetime,
  movieId: PropTypes.string,
};

export default MovieCard;

