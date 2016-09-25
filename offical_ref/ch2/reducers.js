import { combineReducers } from 'redux';
import {SET_VISIBILITY_FILTER, ADD_TODO, TOGGLE_TODO, VisibilityFilters} from './actions';

const todos = (todos = [], action) => {
  if (action.type == ADD_TODO) {
    return [...todos,
        {
          id: todos.length + 1,
          text: action.text,
          completed: false
        }
      ];
  } else if (action.type == TOGGLE_TODO) {
    return todos.map((todo) => {
      if (todo.id == action.id) {
        return Object.assign({}, todo, {
          completed: !todo.completed
        });
      }
      return todo;
    });
  }
  return todos;
}

const visibilityFilter = (filter = VisibilityFilters.SHOW_ALL, action) => {
  if (action.type == SET_VISIBILITY_FILTER) {
    return action.filter;
  }
  return filter;
}

const TodoApp = combineReducers({
  todos,
  visibilityFilter
})

export default TodoApp;
