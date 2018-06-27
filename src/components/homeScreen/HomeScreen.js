import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';

//Components
import MovieSection from '../movieSection';
import SearchResult from '../searchResult';
import LoginPopUp from '../loginPopUp';
import WatchList from '../watchlist';

//Actions
import {
  fetchBaseConfigs,
  fetchMovies,
  searchMovie,
  showHomePage,
  hideHomePage,
  onShowLoginPage,
  onHideLoginPage,
  onShowWatchList,
  fetchWatchList,
} from '../../actions';

//Styles
import searchLogo from '../../magnifying-glass.svg';

import './HomeScreen.css';

class HomeScreen extends Component {

  state = {
    movieToSearch: '',
  }

  componentWillMount() {
    debugger
    if (_isEmpty(this.props.topMovies.movies)) {
      this.props.fetchMovies('top_rated');
    }

    if (_isEmpty(this.props.recentlyReleased.movies)) {
      this.props.fetchMovies('now_playing');
    }

    if (_isEmpty(this.props.baseUrl)) {
      this.props.fetchBaseConfigs();
    }
  }

  componentWillReceiveProps(nextProps) {
    // if(nextProps.loginSuccessful) {
    //   this.props.fetchWatchList();
    // }
  }

  goBackHome = () => {
    this.props.showHomePage();
  }

  onChangeSearch = event => {
    const movieName = event.currentTarget.value;

    this.setState({
      movieToSearch: movieName,
    })
  }

  onClickSearch = () => {
    if (!this.props.searchResult[this.state.movieToSearch]) {
      this.props.searchMovie(this.state.movieToSearch);
    }
    this.props.hideHomePage();
  }

  onKeyDown = event => {
    if (event.keyCode === 13) {
      this.onClickSearch();
    }
  }

  renderBody() {
    const { movieToSearch } = this.state;
    const currentSearchResult = this.props.searchResult[movieToSearch];

    if (this.props.showSearchResult) {
      return (
        <div className="home-screen__body-search">
          <SearchResult
            baseUrl={this.props.baseUrl}
            posterSize={this.props.posterSize}
            movies={currentSearchResult}
            goBackHome={this.goBackHome}
            keyword={movieToSearch}
          />
        </div>
      );
    }

    if (this.props.showWatchList) {
      return (
        <div className="home-screen__body-watchList">
          <WatchList
            baseUrl={this.props.baseUrl}
            posterSize={this.props.posterSize}
            goBackHome={this.goBackHome}
          />
        </div>
      )
    }

    const topMovies = this.props.topMovies.movies.slice(0, 20);
    const recentlyReleased = this.props.recentlyReleased.movies.slice(0, 20);

    return (
      <div className="home-screen__body-main">
        {this.props.showLoginPopUp && <LoginPopUp
          onCloseLoginPopUp={this.props.onHideLoginPage}
        />}
        <div className="home-screen__body-section">
          <MovieSection
            loading={this.props.loading}
            type="top_rated"
            baseUrl={this.props.baseUrl}
            posterSize={this.props.posterSize}
            sectionName={'Top Rated'}
            movies={topMovies}
          />
        </div>
        <div className="home-screen__body-section">
          <MovieSection
            loading={this.props.loading}
            type="now_playing"
            baseUrl={this.props.baseUrl}
            posterSize={this.props.posterSize}
            sectionName={'Recently Released'}
            movies={recentlyReleased}
          />
        </div>
      </div>
    )
  }

  renderUserOptions = () => {
    const {
      sessionId,
      username,
    } = localStorage;

    if (sessionId) {
      return <div className="home-screen__header-item">
        <div className="home-screen__header-item-watchlist" onClick={this.props.onShowWatchList}>My Watchlist</div>
        <div className="home-screen__header-item-username">{username}</div>
      </div>;
    }

    return <span onClick={this.props.onShowLoginPage}>Login</span>;
  }

  render() {
    return (
      <div className="home-screen">
        <header className="home-screen__header">
          <div className="home-screen__header-items">
            <h1 className="home-screen__title" onClick={this.props.showHomePage}><Link to={'/'}>Movie Gallery</Link></h1>
            <div className="home-screen__header-actions">
              <div className="home-screen__header-actions__search">
                <input
                  className="home-screen__header-actions__search-input"
                  type="text" onChange={this.onChangeSearch}
                  onKeyDown={this.onKeyDown}
                  placeholder="Search Movie"
                />
                <div className="search-logo__cont">
                  <img src={searchLogo} className="search-logo" alt="logo" onClick={this.onClickSearch} />
                </div>
              </div>
              {this.renderUserOptions()}
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

HomeScreen.propTypes = {
  topMovies: PropTypes.object,
  recentlyReleased: PropTypes.object,
  baseUrl: PropTypes.string,
  posterSize: PropTypes.string,
  loadingMovies: PropTypes.bool,
  searchResult: PropTypes.object,
  fetchMovies: PropTypes.func,
  fetchBaseConfigs: PropTypes.func,
  searchMovie: PropTypes.func,
  showHomePage: PropTypes.func,
  hideHomePage: PropTypes.func,
};

const mapStateToProps = ({ movies }) => ({
  topMovies: movies.topMovies,
  recentlyReleased: movies.recentlyReleased,
  baseUrl: movies.baseUrl,
  posterSize: movies.posterSize,
  searchResult: movies.searchResult,
  showHome: movies.showHome,
  showSearchResult: movies.showSearchResult,
  showLoginPopUp: movies.showLoginPopUp,
  showWatchList: movies.showWatchList,
  loading: movies.loadingMovies,
  loginSuccessful: movies.loginSuccessful,
});

export default connect(
  mapStateToProps, {
    fetchBaseConfigs,
    fetchMovies,
    searchMovie,
    showHomePage,
    hideHomePage,
    onHideLoginPage,
    onShowLoginPage,
    onShowWatchList,
    fetchWatchList,
  }
)(HomeScreen);
