import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import AsyncApp from './containers/AsyncApp';

import {fetchPosts, setSubreddit} from './actions.js';

let loggerMiddleware = createLogger();
let preloadedState = {
  selectedSubreddit: 'hackintosh',
  postsBySubreddit: {}
};
let store = createStore(rootReducer, preloadedState, applyMiddleware(
  reduxThunk, loggerMiddleware
));
const App = () => (
  <Provider store={store}>
  <AsyncApp />
  </Provider>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
