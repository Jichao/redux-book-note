import React,{PropTypes} from 'react';

const Todo = ({onClick, text, completed}) =>
(
  <li
  style={{
    textDecoration: completed ? 'line-through' : 'none'
  }}
  onClick={onClick}
  >
  {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};

export default Todo;
