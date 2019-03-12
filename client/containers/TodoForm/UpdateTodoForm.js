import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import "./TodoForm.css";

class UpdateTodoForm extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
      body: "",
      completed: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateTodoHandler = this.updateTodoHandler.bind(this);
  }

  componentDidMount() {
    this.isMounted = true;
    axios.get("/api/todos/" + this.props.selectedTodoId).then(response => {
      if (this.isMounted) {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          body: response.data.body,
          completed: response.data.completed
        });
      }
    });
  }

  componentWillUnmount() {
    this.isMounted = false;
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
    this.props.resetStateHandler();
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

UpdateTodoForm.propTypes = {
  updateTodo: PropTypes.func.isRequired,
  selectedTodoId: PropTypes.number,
  resetStateHandler: PropTypes.func.isRequired
};

export default UpdateTodoForm;
