import React, { Component } from 'react';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';

import MovieSection from '../movieSection';
import SearchResult from '../searchResult';

import searchLogo from '../../magnifying-glass.svg';

import './HomeScreen.css';

class HomeScreen extends Component {

  state = {
    loggedIn: false,
    userName: '',
    topMovies: [],
    recentlySearched: [],
    movieToSearch: '',
    searchResult: [],
    posterSize: 'w300',
  }

  componentWillMount() {
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=5d18d5ebb6703b4789dca35c9f7bb17b')
      .then(({data}) => {
        this.setState({
          topMovies: data.results,
        })
      })
      .catch(err=> err);
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=5d18d5ebb6703b4789dca35c9f7bb17b')
      .then(({data}) => {
        this.setState({
          recentlySearched: data.results,
        })
      })
      .catch(err=> err);
    axios.get('https://api.themoviedb.org/3/configuration?api_key=5d18d5ebb6703b4789dca35c9f7bb17b')
      .then(({data}) => {
        debugger
        this.setState({
          baseUrl: data.images.base_url,
        })
      })
      .catch(err=> err);
  }

  goBackHome = () => {
    this.setState({
      searchResult: [],
    })
  }

  onChangeSearch = event => {
    const movieName = event.currentTarget.value;

    this.setState({
      movieToSearch: movieName,
    })
  }

  onClickSearch = () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5d18d5ebb6703b4789dca35c9f7bb17b&query=${this.state.movieToSearch}`)
      .then(({data}) => {
        this.setState({
          searchResult: data.results,
        })
      })
      .catch(err=> err);
  }

  onKeyDown = event => {
   if (event.keyCode === 13) {
     this.onClickSearch();
   }
  }

  renderBody() {
    const { searchResult, movieToSearch } = this.state;
    debugger

    if (!_isEmpty(searchResult)) {
      return (
        <div className="home-screen__body-search">
          <SearchResult
            baseUrl={this.state.baseUrl}
            posterSize={this.state.posterSize}
            movies={searchResult}
            goBackHome={this.goBackHome}
            keyword={movieToSearch}
          />
        </div>
      );
    }

    return (
      <div className="home-screen__body-main">
        {this.state.topMovies && <div className="home-screen__body-section">
          <MovieSection
            baseUrl={this.state.baseUrl}
            posterSize={this.state.posterSize}
            sectionName={'Top Rated'}
            movies={this.state.topMovies}
          />
        </div>}
        {this.state.recentlySearched && <div className="home-screen__body-section">
          <MovieSection
            baseUrl={this.state.baseUrl}
            posterSize={this.state.posterSize}
            sectionName={'Recently Released'}
            movies={this.state.recentlySearched}
          />
        </div>}
      </div>
    )
  }

  render() {

    return (
      <div className="home-screen">
        <header className="home-screen__header">
          <div className="home-screen__header-items">
            <h1 className="home-screen__title">Movie Gallery</h1>
            <div className="home-screen__header-actions">
              <div className="home-screen__header-actions__search">
                <input
                  className="home-screen__header-actions__search-input"
                  type="text" onChange={this.onChangeSearch}
                  onKeyDown={this.onKeyDown}
                  placeholder="Search Movie"
                />
                <div className="search-logo__cont">
                  <img src={searchLogo} className="search-logo" alt="logo" onClick={this.onClickSearch}/>
                </div>
              </div>
              {this.state.loggedIn ? <span>{this.state.userName}</span> : <span>Login</span>}
            </div>
          </div>
        </header>
        <section className="home-screen__body">
          {this.renderBody()}
        </section>
      </div>
    );
  }
}

export default HomeScreen;
