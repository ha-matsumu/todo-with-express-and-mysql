import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Todo from "../../components/Todo/Todo";
import "./TodoList.css";
import TodoForm from "../TodoForm/TodoForm";
import * as actions from "../../actions/index";

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

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
        />
      );
    });

    return (
      <div>
        <section>
          <TodoForm addTodo={this.props.addTodo} />
        </section>
        <section className="todoList">{todos}</section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    loading: state.todos.loading,
    error: state.todos.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTodos: () => dispatch(actions.fetchTodos()),
    addTodo: todo => dispatch(actions.addTodo(todo))
  };
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  loading: PropTypes.bool.isRequired,

  // This error refers to error object of state in the client/reducers/todos.js
  error: PropTypes.shape({
    message: PropTypes.string,
    statusCode: PropTypes.number
  }),
  fetchTodos: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
