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
        console.log('receive_posts');
        let keke =  Object.assign({}, posts, {
          isFetching: false,
          items: action.posts
        });
        console.log(keke);
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

  const subreddit = (state = 'hackintosh', action) => {
    if (action.type == SET_SUBREDDIT) {
      return action.subreddit;
    }
    return state;
  };

  const postsBySubreddit = (state = {}, action) => {
    console.log('postsBySubreddit reducer action type : ' + action.type);
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
    subreddit,
    postsBySubreddit
  });
