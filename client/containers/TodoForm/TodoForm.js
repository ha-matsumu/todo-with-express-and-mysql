import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

import "./TodoForm.css";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
      body: "",
      completed: false,
      requestAdd: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate() {
    if (this.props.selectedTodoId !== this.state.id) {
      axios.get("/api/todos/" + this.props.selectedTodoId).then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          body: response.data.body,
          completed: response.data.completed,
          requestAdd: false
        });
      });
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  cancelHandler = () => {};

  requestHandler = () => {
    if (!this.state.title) return;
    const todo = {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body,
      completed: this.state.completed
    };
    {
      this.state.requestAdd
        ? this.props.addTodo(todo)
        : this.props.updateTodo(todo);
    }
    this.setState({
      id: null,
      title: "",
      body: "",
      completed: false,
      requestAdd: true
    });
  };

  render() {
    return (
      <div className="todoForm">
        <h1>{this.state.requestAdd ? "Add Todo" : "Update Todo"}</h1>
        <label>
          Title
          <input
            name="title"
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
        {this.state.requestAdd ? null : (
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
        )}
        <button className="Cancel" onClick={this.cancelHandler}>Cancel</button>
        <button onClick={this.requestHandler}>
          {this.state.requestAdd ? "Add Todo" : "Update Todo"}
        </button>
      </div>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
};

export default TodoForm;
