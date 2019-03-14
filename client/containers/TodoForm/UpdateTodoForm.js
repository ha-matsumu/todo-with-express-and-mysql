import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "../../components/Button/Button";
import "./TodoForm.css";

class UpdateTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.todo.id,
      title: this.props.todo.title,
      body: this.props.todo.body,
      completed: this.props.todo.completed
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateTodoHandler = this.updateTodoHandler.bind(this);
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
        <Button btnType="update" clickButton={this.updateTodoHandler}>Update Todo</Button>
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
  updateTodo: PropTypes.func.isRequired,
  resetFormHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(UpdateTodoForm);
