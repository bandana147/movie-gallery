import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomeScreen from './components/homeScreen';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HomeScreen />, document.getElementById('root'));
registerServiceWorker();
