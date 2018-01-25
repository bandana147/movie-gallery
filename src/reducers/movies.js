import update from 'immutability-helper';
import _get from 'lodash/get';

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
} from '../constants/ActionTypes';

const MOVIE_TYPE = {
  'top_rated': 'topMovies',
  'now_playing': 'recentlyReleased',
}

const INITIAL_STATE = {
  topMovies: {
    movies: [],
  },
  recentlyReleased: {
    movies: [],
  },
  posterSize: 'w154',
  movieCredits: [],
  movieDetails: {},
  searchResult: [],
};

export default function (state = INITIAL_STATE, action) {
  const {payload} = action;

  switch (action.type) {
    case FETCH_MOVIES_PENDING:
      return update(state, {
        [MOVIE_TYPE[payload]]: {
          loadingMovies: {
            $set: true,
          },
        },
      });

    case FETCH_MOVIES_SUCCESS:
      const currentMovies = state[MOVIE_TYPE[payload.type]].movies.slice();
      const updatedMovies = currentMovies.concat(payload.movies);

      return update(state, {
        [MOVIE_TYPE[payload.type]]: {
          movies: {
            $set: updatedMovies,
          },
          loadingMovies: {
            $set: false,
          },
          hasMore: {
            $set: payload.hasMore,
          }
        },
      });

    case FETCH_BASE_CONFIGS_PENDING:
      return update(state, {
        loading: {
          $set: true,
        },
      });

    case FETCH_BASE_CONFIGS_SUCCESS:
      return update(state, {
        baseUrl: {
          $set: _get(payload, 'images.base_url'),
        },
        loading: {
          $set: false,
        },
      });

    case FETCH_MOVIE_DETAILS_PENDING:
      return update(state, {
        loading: {
          $set: true,
        },
      });

    case FETCH_MOVIE_DETAILS_SUCCESS:
      return update(state, {
        movieDetails: {
          [payload.movieId]: {
            $set: payload.data,
          }
        },
        loading: {
          $set: false,
        },
      });

    case FETCH_MOVIE_CREDITS_PENDING:
      return update(state, {
        loading: {
          $set: true,
        },
      });

    case FETCH_MOVIE_CREDITS_SUCCESS:
      return update(state, {
        movieCredits: {
          [payload.movieId]: {
            $set: payload.data,
          }
        },
        loading: {
          $set: false,
        },
      });

    case SEARCH_MOVIE_PENDING:
      return update(state, {
        loading: {
          $set: true,
        },
      });

    case SEARCH_MOVIE_SUCCESS:
      return update(state, {
        searchResult: {
         [payload.movieToSearch]: {
           $set: payload.data.results,
         }
        },
        showHome: {
          $set: false,
        },
        loading: {
          $set: false,
        },
      });

    case SHOW_HOMEPAGE:
      return update(state, {
        showHome: {
          $set: true,
        },
      });

    case HIDE_HOMEPAGE:
      return update(state, {
        showHome: {
          $set: false,
        },
      });

    default:
      return state;
  }
}

