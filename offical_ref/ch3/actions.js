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

const fetchPosts = (subreddit) => {
    return (dispatch) => {
        dispatch(requestPosts(subreddit));
        return fetch(`http://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(subreddit, json)));
    }
};

const needFetchPosts = (state, subreddit) => {
  let posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return !posts.didInvalidate;
  }
};

export const fetchPostsIfNeeded = (subreddit) => {
  return (dispatch, getState) => {
    if (needFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  }
}
