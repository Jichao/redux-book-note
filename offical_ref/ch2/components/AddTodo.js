import React,{PropTypes} from 'react';
import Todo from './Todo';
import {addTodo} from '../actions';
import {connect} from 'react-redux';

const AddTodo = ({dispatch}) => {
  let myInput;
  return (
    <input
    type="text"
    ref={(c) => {
      myInput = c
    }}
    onKeyPress={(event) => {
      if (event.key == 'Enter') {
        dispatch(addTodo(myInput.value));
      }
    }}
    />
  )
};

export default connect()(AddTodo);
