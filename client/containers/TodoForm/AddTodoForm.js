import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../../components/Button/Button";
import "./TodoForm.css";

class AddTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      completed: false,
      error: null
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

  addTodoHandler = async () => {
    if (!this.state.title) return;
    const todo = {
      title: this.state.title,
      body: this.state.body,
      completed: this.state.completed
    };
    try {
      await this.props.addTodo(todo);
    } catch (error) {
      this.setState({ error: error });
    }
    this.props.purchaseCancel();
  };

  render() {
    let error = null;
    if (this.state.error) {
      error = <p style={{ textAlign: "center" }}>{this.state.error}</p>;
    }

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
        <Button btnType="cancel" clickButton={this.props.purchaseCancel}>
          Cancel
        </Button>
        <Button btnType="add" clickButton={this.addTodoHandler}>
          Add
        </Button>
        {error}
      </div>
    );
  }
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  purchaseCancel: PropTypes.func.isRequired
};

export default AddTodoForm;
