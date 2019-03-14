import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./TodoForm.css";

class UpdateTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.selectedTodo.id,
      title: this.props.selectedTodo.title,
      body: this.props.selectedTodo.body,
      completed: this.props.selectedTodo.completed
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateTodoHandler = this.updateTodoHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedTodo.id !== prevState.id) {
      return {
        id: nextProps.selectedTodo.id,
        title: nextProps.selectedTodo.title,
        body: nextProps.selectedTodo.body,
        completed: nextProps.selectedTodo.completed
      };
    }
    return null;
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  updateTodoHandler = async () => {
    if (!this.state.title) return;
    const todo = {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body,
      completed: this.state.completed
    };
    await this.props.updateTodo(todo);
    this.props.resetFormHandler();
  };

  render() {
    return (
      <div className="todoForm">
        <h1>Update Todo</h1>
        <label>
          Title
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Body
          <textarea
            name="body"
            rows="4"
            value={this.state.body}
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          completed
          <select
            name="completed"
            value={this.state.completed}
            onChange={this.handleInputChange}
          >
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </label>
        <button onClick={this.updateTodoHandler}>Update Todo</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todo: state.todos.todo
  };
};

UpdateTodoForm.propTypes = {
  selectedTodo: PropTypes.object.isRequired,
  updateTodo: PropTypes.func.isRequired,
  resetFormHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(UpdateTodoForm);
