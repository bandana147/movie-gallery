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
  return axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`)
    .then(({data}) => ({movieId, data}));
};

export const searchMovie = function (movieToSearch) {
  return axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${movieToSearch}`)
    .then(({data}) => ({movieToSearch, data}));
};

export const addToWatchList = function (mediaId, mediaType='movie') {
  const sessionId = localStorage.sessionId;
  const accountId = localStorage.accountId;
  const payload = {
    media_type: mediaType,
    media_id: mediaId,
    watchlist: true,
  };

  return axios.post(`${BASE_URL}/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`, payload);
};

export const fetchWatchList = function () {
  const sessionId = localStorage.sessionId;
  const accountId = localStorage.accountId;

  return axios.get(`${BASE_URL}/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`)
    .then(({data}) => (data.results));
};

export const loginUser = (username, password) => {
  return axios.get(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`)
    .then(({data})=> {
      const requestToken = data.request_token;
      return axios.get(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=5d18d5ebb6703b4789dca35c9f7bb17b&username=${username}&password=${password}&request_token=${requestToken}`)
        .then(() => {
          return axios.get(`https://api.themoviedb.org/3/authentication/session/new?api_key=5d18d5ebb6703b4789dca35c9f7bb17b&request_token=${requestToken}`)
            .then(({data}) => {
              localStorage.setItem('sessionId', data.session_id);
              return axios.get(`https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${data.session_id}`)
                .then(accountRes => {
                  localStorage.setItem('accountId', accountRes.data.id);
                  localStorage.setItem('username', accountRes.data.username || accountRes.data.name );
                });
            })
            .catch(err => {
              console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    });
};

export default {
  fetchBaseConfigs,
  fetchMovieDetails,
  fetchMovies,
  searchMovie,
  addToWatchList,
  loginUser,
  fetchWatchList,
};
