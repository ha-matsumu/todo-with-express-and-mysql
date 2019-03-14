import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Todo from "../../components/Todo/Todo";
import "./TodoList.css";
import AddTodoForm from "../TodoForm/AddTodoForm";
import UpdateTodoForm from "../TodoForm/UpdateTodoForm";
import * as actions from "../../actions/index";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTodo: {},
      requestUpdate: false
    };
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  selectTodoHandler = async id => {
    this.resetFormHandler();
    const selectedTodo = this.props.todos.find(todo => todo.id === id);
    await this.setState({ requestUpdate: true, selectedTodo });
  };

  resetFormHandler = () => {
    this.setState({
      requestUpdate: false,
      selectedTodo: null
    });
  };

  render() {
    if (this.props.loading) {
      return <p style={{ textAlign: "center" }}>Now loading...</p>;
    }

    if (this.props.error) {
      return (
        <p style={{ textAlign: "center" }}>
          {this.props.error.statusCode} {this.props.error.message}
        </p>
      );
    }

    const todos = this.props.todos.map(todo => {
      return (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          body={todo.body}
          completed={todo.completed}
          selectTodo={this.selectTodoHandler.bind(this, todo.id)}
        />
      );
    });

    let todoForm = <AddTodoForm addTodo={this.props.addTodo} />;
    if (this.state.requestUpdate) {
      todoForm = (
        <UpdateTodoForm
          selectedTodo={this.state.selectedTodo}
          updateTodo={this.props.updateTodo}
          resetFormHandler={this.resetFormHandler}
        />
      );
    }

    return (
      <div>
        <section>{todoForm}</section>
        <section className="todoList">{todos}</section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    todo: state.todos.todo,
    loading: state.todos.loading,
    error: state.todos.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: () => dispatch(actions.fetchTodos()),
    addTodo: todo => dispatch(actions.addTodo(todo)),
    updateTodo: todo => dispatch(actions.updateTodo(todo)),
    fetchTodoById: todoId => dispatch(actions.fetchTodoById(todoId))
  };
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  todo: PropTypes.object,
  loading: PropTypes.bool.isRequired,

  // This error refers to error object of state in the client/reducers/todos.js
  error: PropTypes.shape({
    message: PropTypes.string,
    statusCode: PropTypes.number
  }),
  fetchTodos: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  fetchTodoById: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
