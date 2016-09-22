import {createStore} from 'redux';

//reducer
function reduce(state = 0, action) {
  if (action.type == 'INCREMENT') {
    state = state + 1;
  } else if (action.type == 'DECREMENT') {
    state = state - 1;
  }
  return state;
}

//store
let store = createStore(reduce, 100);

//react-view
store.subscribe(() => {
  console.log(store.getState());
});

//change the state with dispatch
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'INCREMENT'});
store.dispatch({ type: 'DECREMENT'});
store.dispatch({ type: 'INCREMENT'});
