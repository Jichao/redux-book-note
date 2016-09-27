import { combineReducers } from 'redux';
import { SET_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS }
from './actions';

const posts = (posts = {
  isFetching: false,
  didInvalidate: false,
  items: [] }, action) =>
  {
    switch (action.type) {
      case REQUEST_POSTS: {
        return Object.assign({}, posts, {
          isFetching: true
        });
      }
      case RECEIVE_POSTS: {
        let keke =  Object.assign({}, posts, {
          isFetching: false,
          items: action.posts,
          lastUpdated: action.receiveAt
        });
        return keke;
      }
      case INVALIDATE_SUBREDDIT: {
        return Object.assign({}, posts, {
          didInvalidate: false
        });
      }
      default: {
        return posts;
      }
    }
  };

  const selectedSubreddit = (state = 'hackintosh', action) => {
    if (action.type == SET_SUBREDDIT) {
      return action.subreddit;
    }
    return state;
  };

  const postsBySubreddit = (state = {}, action) => {
    switch (action.type) {
      case REQUEST_POSTS:
      case RECEIVE_POSTS:
      case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        [action.subreddit] : posts(state[action.subreddit], action)
      });
      default:
      return state;
    };
  };

  export default combineReducers({
    selectedSubreddit,
    postsBySubreddit
  });
