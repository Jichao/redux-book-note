import React,{PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Picker from '../components/Picker';
import {setSubreddit, fetchPostsIfNeeded, invalidateSubreddit} from '../actions';
import Posts from '../components/Posts';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const {dispatch, selectedSubreddit} = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedSubreddit != nextProps.selectedSubreddit) {
      const {dispatch} = this.props;
      dispatch(fetchPostsIfNeeded(nextProps.selectedSubreddit));
    }
  }

  render() {
    const {isFetching, posts, lastUpdated, selectedSubreddit} = this.props;
    return (
      <div>
        <Picker value={selectedSubreddit} onChange={this.handleChange}
        options={['hackintosh', 'reactjs', 'kekekekekeke']} />
        <p>
          {lastUpdated &&
            <span>
              last updated at {new Date(lastUpdated).toLocaleTimeString()}
            </span>
          }
          {!isFetching &&
            <a href="javascript:void(0)" onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length == 0 &&
          <h2>Loading</h2>
        }
        {!isFetching && posts.length == 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <Posts posts={posts} />
        }
      </div>
    )
  }

  handleChange(subreddit) {
    const {dispatch} = this.props;
    dispatch(setSubreddit(subreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const {dispatch, selectedSubreddit} = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }
}

AsyncApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number
}

const mapStateToProps = (state) => {
  const {selectedSubreddit, postsBySubreddit} = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = state.postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  };
  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp);
