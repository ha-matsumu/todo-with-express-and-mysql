import React, { Component } from "react";
import { connect } from "react-redux";

import Todo from "../components/Todo/Todo";
import "./TodoList.css";
import * as actions from "../actions/index";

class TodoList extends Component {
  componentDidMount() {
    this.props.onFetchTodos();
  }

  render() {
    let todos = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.props.loading) {
      todos = this.props.todos.map(todo => {
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
    }

    return (
      <div>
        <section className="TodoList">{todos}</section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.todos,
    loading: state.todos.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTodos: () => dispatch(actions.fetchTodos())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
