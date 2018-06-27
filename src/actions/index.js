import movieApi from '../api/movieApi'
import {
  FETCH_MOVIES_PENDING,
  FETCH_MOVIES_SUCCESS,
  FETCH_BASE_CONFIGS_PENDING,
  FETCH_BASE_CONFIGS_SUCCESS,
  FETCH_MOVIE_DETAILS_PENDING,
  FETCH_MOVIE_DETAILS_SUCCESS,
  SEARCH_MOVIE_PENDING,
  SEARCH_MOVIE_SUCCESS,
  SHOW_HOMEPAGE,
  HIDE_HOMEPAGE,
  ADD_TO_WATCH_LIST_SUCCESS,
  ADD_TO_WATCH_LIST_PENDING,
  USER_LOGIN_PENDING,
  USER_LOGIN_SUCCESS,
  HIDE_LOGIN_POP_UP,
  SHOW_LOGIN_POP_UP,
  FETCH_WATCH_LIST_PENDING,
  FETCH_WATCH_LIST_SUCCESS,
  SHOW_WATCHLIST,
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
    movieId
  });

  movieApi.fetchMovieDetails(movieId)
    .then(response => {
      dispatch({
        type: FETCH_MOVIE_DETAILS_SUCCESS,
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

export const addToWatchList = (mediaId, mediaType) => dispatch => {
  dispatch({
    type: ADD_TO_WATCH_LIST_PENDING,
  });

  movieApi.addToWatchList(mediaId, mediaType)
    .then(response => {
      dispatch({
        type: ADD_TO_WATCH_LIST_SUCCESS,
        payload: response,
      });
    });
};

export const loginUser = (username, password) => dispatch => {
  dispatch({
    type: USER_LOGIN_PENDING,
  });

  movieApi.loginUser(username, password)
    .then(response => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response,
      });
    });
}


export const showHomePage = () => dispatch => {
  dispatch({
    type: SHOW_HOMEPAGE,
  });
};

export const hideHomePage = () => dispatch => {
  dispatch({
    type: HIDE_HOMEPAGE,
  });
};

export const onShowLoginPage = () => dispatch => {
  dispatch({
    type: SHOW_LOGIN_POP_UP,
  });
};

export const onHideLoginPage = () => dispatch => {
  dispatch({
    type: HIDE_LOGIN_POP_UP,
  });
};

export const onShowWatchList = () => dispatch => {
  dispatch({
    type: SHOW_WATCHLIST,
  });
};

export const fetchWatchList = (payload) => dispatch => {
  dispatch({
    type: FETCH_WATCH_LIST_PENDING,
  });

  movieApi.fetchWatchList()
    .then(response => {
      dispatch({
        type: FETCH_WATCH_LIST_SUCCESS,
        payload: response,
      });
    });
};
