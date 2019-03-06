import React, { Component } from "react";
import { connect } from "react-redux";

import Todo from "../components/Todo/Todo";
import "./TodoList.css";
import * as actions from "../actions/index";

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    if (this.props.loading) {
      return <p style={{ textAlign: "center" }}>Now loading...</p>;
    }

    if (this.props.error) {
      return <p style={{ textAlign: "center" }}>Something went wrong...</p>;
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
    fetchTodos: () => dispatch(actions.fetchTodos())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
