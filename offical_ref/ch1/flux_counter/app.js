import flux from 'flux';
import assign from 'object-assign';
import { EventEmitter } from 'events';
//disptacher
let dispatcher = new flux.Dispatcher();

let counter = 1024;
const CHANGE_EVENT = 'change';

//store
let store = assign({}, EventEmitter.prototype, {
    getState: function() {
      return counter;
    },
    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      this.off(CHANGE_EVENT, callback);
    }
});

dispatcher.register(function(action) {
  if (action.type == 'INCREMENT') {
      counter = counter + 1;
      store.emitChange();
  } else if (action.type == 'DECREMENT') {
      counter = counter - 1;
      store.emitChange();
  }
});

store.addChangeListener(function() {
  console.log(store.getState());
});

dispatcher.dispatch({ type: 'INCREMENT' });
dispatcher.dispatch({ type: 'INCREMENT' });
dispatcher.dispatch({ type: 'INCREMENT' });
dispatcher.dispatch({ type: 'DECREMENT' });
