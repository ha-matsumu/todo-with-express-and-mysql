import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Todo from "../../components/Todo/Todo";
import "./TodoList.css";
import AddTodoForm from "../TodoForm/AddTodoForm";
import UpdateTodoForm from "../TodoForm/UpdateTodoForm";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/Button/Button";
import * as actions from "../../actions/index";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      selectedTodo: null
    };

    this.showModalHandler = this.showModalHandler.bind(this);
    this.hideModalHandler = this.hideModalHandler.bind(this);
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  showModalHandler = () => {
    this.setState({ shown: true });
  };

  hideModalHandler = () => {
    this.setState({ shown: false, selectedTodo: null });
  };

  selectTodoHandler = id => {
    const selectedTodo = this.props.todos.find(todo => todo.id === id);
    this.setState({ shown: true, selectedTodo });
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

    let todoForm = (
      <AddTodoForm
        addTodo={this.props.addTodo}
        hideModalHandler={this.hideModalHandler}
      />
    );
    if (this.state.selectedTodo) {
      todoForm = (
        <UpdateTodoForm
          selectedTodo={this.state.selectedTodo}
          updateTodo={this.props.updateTodo}
          hideModalHandler={this.hideModalHandler}
        />
      );
    }

    return (
      <div>
        <Modal shown={this.state.shown} closeModal={this.hideModalHandler}>
          {todoForm}
        </Modal>
        <section className="todoList">
          {todos}
          <article>
            <Button btnType="plus" clickButton={this.showModalHandler}>
              <h1>+</h1>
            </Button>
          </article>
        </section>
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
