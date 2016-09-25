import {connect} from 'react-redux';
import TodoList from '../components/TodoList';
import { addTodo, toggleTodo, VisibilityFilters } from '../actions';

const getTodosByFilter = (todos, filter) => {
  return todos.filter((todo) => {
    if (filter == VisibilityFilters.SHOW_ALL) {
      return true;
    } else if (filter == VisibilityFilters.SHOW_COMPLETED) {
      return todo.completed;
    } else if (filter == VisibilityFilters.SHOW_ACTIVE) {
      return !todo.completed;
    }
  });
}

const mapStateToProps = (state) => {
  return {todos : getTodosByFilter(state.todos, state.visibilityFilter)};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (id) => {
      dispatch(toggleTodo(id));
    }
  }
}

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
export default VisibleTodoList;
