import fetch from 'isomorphic-fetch';

export const SET_SUBREDDIT = 'SET_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUSET_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const setSubreddit = (subreddit) => {
  return {
    type: SET_SUBREDDIT,
    subreddit
  };
};

export const invalidateSubreddit = (subreddit) => {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
};

const requestPosts = (subreddit) => {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
};

const receivePosts = (subreddit, json) => {
  return {
    type: RECEIVE_POSTS,
    posts: json.data.children.map(child => child.data),
    subreddit,
    receiveAt: Date.now()
  };
};

export const fetchPosts = (subreddit) => {
    return (dispatch) => {
        dispatch(requestPosts(subreddit));
        return fetch(`http://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(subreddit, json)));
    }
};
