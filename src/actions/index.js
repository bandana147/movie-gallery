import movieApi from '../api/movieApi'
import {
  FETCH_MOVIES_PENDING,
  FETCH_MOVIES_SUCCESS,
  FETCH_BASE_CONFIGS_PENDING,
  FETCH_BASE_CONFIGS_SUCCESS,
  FETCH_MOVIE_DETAILS_PENDING,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_CREDITS_PENDING,
  FETCH_MOVIE_CREDITS_SUCCESS,
  SEARCH_MOVIE_PENDING,
  SEARCH_MOVIE_SUCCESS,
  SHOW_HOMEPAGE,
  HIDE_HOMEPAGE,
} from '../constants/ActionTypes'

export const fetchMovies = (movieType, loadMore) => dispatch => {
  dispatch({
    type: FETCH_MOVIES_PENDING,
    payload: movieType,
  });

  movieApi.fetchMovies(movieType, loadMore)
    .then(response => {
      dispatch({
        type: FETCH_MOVIES_SUCCESS,
        payload: response,
      });
    });
};

export const fetchBaseConfigs = (type) => dispatch => {
  dispatch({
    type: FETCH_BASE_CONFIGS_PENDING,
  });

  movieApi.fetchBaseConfigs(type)
    .then(response => {
      dispatch({
        type: FETCH_BASE_CONFIGS_SUCCESS,
        payload: response,
      });
    });
};

export const fetchMovieDetails = (movieId) => dispatch => {
  dispatch({
    type: FETCH_MOVIE_DETAILS_PENDING,
  });

  movieApi.fetchMovieDetails(movieId)
    .then(response => {
      dispatch({
        type: FETCH_MOVIE_DETAILS_SUCCESS,
        payload: response,
      });
    });
};

export const fetchMovieCredits = (movieId) => dispatch => {
  dispatch({
    type: FETCH_MOVIE_CREDITS_PENDING,
  });

  movieApi.fetchMovieCredits(movieId)
    .then(response => {
      dispatch({
        type: FETCH_MOVIE_CREDITS_SUCCESS,
        payload: response,
      });
    });
};

export const searchMovie = (keyword) => dispatch => {
  dispatch({
    type: SEARCH_MOVIE_PENDING,
  });

  movieApi.searchMovie(keyword)
    .then(response => {
      dispatch({
        type: SEARCH_MOVIE_SUCCESS,
        payload: response,
      });
    });
};

export const showHomePage = (keyword) => dispatch => {
  dispatch({
    type: SHOW_HOMEPAGE,
  });
};

export const hideHomePage = (keyword) => dispatch => {
  dispatch({
    type: HIDE_HOMEPAGE,
  });
};


