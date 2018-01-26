import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';

//Components
import HomeScreen from './components/homeScreen';
import MovieList from './components/movieList';
import SearchResult from './components/searchResult';

import './index.css';

const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={HomeScreen}/>
        <Route path="/top_rated" component={MovieList}/>
        <Route path="/now_playing" component={MovieList}/>
        <Route path="/search" component={SearchResult}/>
      </div>
    </Router>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
