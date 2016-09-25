import React,{PropTypes} from 'react';
import Todo from './Todo';

const TodoList = ({onClick, todos}) => {
  return (
    <ul>
    {
      todos.map( (todo) => (
        <Todo key={todo.id}
        text={todo.text}
        completed={todo.completed}
        onClick={() => onClick(todo.id)} />
      ) )
    }
    </ul>
  );
};

TodoList.propTypes = {
  onClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}

export default TodoList;
