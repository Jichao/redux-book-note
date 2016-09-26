import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from './reducers';
import {fetchPosts, setSubreddit} from './actions.js';

let loggerMiddleware = createLogger();

let store = createStore(rootReducer, applyMiddleware(
  reduxThunk, loggerMiddleware
));

store.subscribe(() => {
});

store.dispatch(fetchPosts('hackintosh')).then(() => {
});
