import React, { Component } from "react";
import PropTypes from "prop-types";

import "./TodoForm.css";

class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      completed: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addTodoHandler = this.addTodoHandler.bind(this);
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  addTodoHandler = () => {
    if (!this.state.title) return;
    const todo = {
      title: this.state.title,
      body: this.state.body,
      completed: this.state.completed
    };
    this.props.addTodo(todo);
    this.setState({
      title: "",
      body: ""
    });
  };

  render() {
    return (
      <div className="todoForm">
        <h1>Add a Todo</h1>
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
        <button onClick={this.addTodoHandler}>Add Todo</button>
      </div>
    );
  }
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default AddTodoForm;
