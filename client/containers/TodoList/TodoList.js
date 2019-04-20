import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";

import Todo from "../../components/Todo/Todo";
import "./TodoList.css";
import AddTodoForm from "../TodoForm/AddTodoForm";
import UpdateTodoForm from "../TodoForm/UpdateTodoForm";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../components/hoc/WithErrorHandler/WithErrorHandler";
import axios from "axios";
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

    this.props.fetchTodos();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.todos) !== JSON.stringify(this.props.todos)) {
      this.props.fetchTodos();
    }
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

  dropTodoHandler = async (toId, fromId) => {
    const todos = this.props.todos.slice();
    const toIndex = todos.findIndex(i => i.id === toId);
    const fromIndex = todos.findIndex(i => i.id === fromId);
    const toTodo = {
      ...todos[toIndex],
      order_number: todos[fromIndex].order_number
    };
    const fromTodo = {
      ...todos[fromIndex],
      order_number: todos[toIndex].order_number
    };
    await this.props.updateTodo(toTodo);
    await this.props.updateTodo(fromTodo);
  };

  render() {
    let todos = null;
    if (this.props.loading) {
      todos = <Spinner />;
    }

    if (this.props.error) {
      return (
        <p style={{ textAlign: "center" }}>
          {this.props.error.statusCode} {this.props.error.message}
        </p>
      );
    }

    todos = this.props.todos.map(todo => {
      return (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          body={todo.body}
          completed={todo.completed}
          selectTodo={this.selectTodoHandler.bind(this, todo.id)}
          onDrop={this.dropTodoHandler.bind(this)}
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
          deleteTodo={this.props.deleteTodo}
        />
      );
    }

    return (
      <div>
        <Modal
          shown={this.state.shown}
          hideModalHandler={this.hideModalHandler}
        >
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

function isAndroid() {
  return !!window.navigator.userAgent.match(/Android/);
}

function isIOS() {
  return !!window.navigator.userAgent.match(/iPhone|iPad|iPod/);
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
    deleteTodo: todoId => dispatch(actions.deleteTodo(todoId)),
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
  deleteTodo: PropTypes.func.isRequired,
  fetchTodoById: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  WithErrorHandler(
    DragDropContext(isAndroid() || isIOS() ? TouchBackend : HTML5Backend)(
      TodoList
    ),
    axios
  )
);
