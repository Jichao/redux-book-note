import React,{PropTypes} from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
