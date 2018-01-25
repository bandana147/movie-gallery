import _get from 'lodash/get';
import axios from 'axios';

const API_KEY = '5d18d5ebb6703b4789dca35c9f7bb17b';
const BASE_URL = 'https://api.themoviedb.org/3';

let page = 1;

export const fetchMovies = function (type, loadMore) {

  if (loadMore) {
    page++;
  } else {
    page = 1;
  }
  return axios.get(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`)
    .then(({data}) => {
      const hasMore = page < data.total_pages;
      return {type, movies: _get(data, 'results', []), hasMore}
    });
};

export const fetchBaseConfigs = function () {
  return axios.get(`${BASE_URL}/configuration?api_key=${API_KEY}`)
    .then(({data}) => data);
};

export const fetchMovieDetails = function (movieId) {
  return axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
    .then(({data}) => ({movieId, data}));
};

export const fetchMovieCredits = function (movieId) {
  return axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
    .then(({data}) => ({movieId, data}));
};

export const searchMovie = function (movieToSearch) {
  return axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${movieToSearch}`)
    .then(({data}) => ({movieToSearch, data}));
};

export default {
  fetchBaseConfigs,
  fetchMovieDetails,
  fetchMovies,
  fetchMovieCredits,
  searchMovie,
};
