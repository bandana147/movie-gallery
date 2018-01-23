import React, { Component } from 'react';
import axios from 'axios';
import MovieSection from '../movieSection';
import './HomeScreen.css';

class HomeScreen extends Component {

  state = {
    loggedIn: false,
    userName: '',
    topMovies: [],
    recentlySearched: [],
  }

  componentWillMount() {
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=5d18d5ebb6703b4789dca35c9f7bb17b')
      .then(({data}) => {
        this.setState({
          topMovies: data.results,
        })
      })
      .catch(err=> {
        debugger
      })
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=5d18d5ebb6703b4789dca35c9f7bb17b')
      .then(({data}) => {
        this.setState({
          recentlySearched: data.results,
        })
      })
      .catch(err=> {
        debugger
      })
  }

  searchMovie = () => {
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=5d18d5ebb6703b4789dca35c9f7bb17b')
      .then(({data}) => {
        this.setState({
          topMovies: data.results,
        })
      })
      .catch(err=> {
        debugger
      })
  }

  render() {

    return (
      <div className="home-screen">
        <header className="home-screen__header">
          <div  className="home-screen__header-items">
            <h1 className="home-screen__title">Movie Gallery</h1>
            <div>
              <span onClick={this.searchMovie}> Search </span>
              {this.state.loggedIn ? <span>{this.state.userName}</span> : <span>Login</span>}
            </div>
          </div>
        </header>
        <section className="home-screen__body">
          {this.state.topMovies && <div className="home-screen__body-section">
            <MovieSection
              sectionName={'Top Rated'}
              movies={this.state.topMovies}
            />
          </div>}
          {this.state.recentlySearched &&  <div className="home-screen__body-section">
            <MovieSection
              sectionName={'Recently Released'}
              movies={this.state.recentlySearched}
            />
          </div>}
        </section>
      </div>
    );
  }
}

export default HomeScreen;
