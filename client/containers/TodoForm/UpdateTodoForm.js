import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Button from "../../components/Button/Button";
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

  componentDidUpdate(prevState) {
    if (this.props.selectedTodo.id !== prevState.selectedTodo.id) {
      this.setState({
        id: this.props.selectedTodo.id,
        title: this.props.selectedTodo.title,
        body: this.props.selectedTodo.body,
        completed: this.props.selectedTodo.completed
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

  updateTodoHandler = async () => {
    if (!this.state.title) return;
    const todo = {
      id: this.state.id,
      title: this.state.title,
      body: this.state.body,
      completed: this.state.completed
    };
    await this.props.updateTodo(todo);
    this.props.purchaseCancel();
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
        <Button btnType="cancel" clickButton={this.props.purchaseCancel}>
          Cancel
        </Button>
        <Button btnType="update" clickButton={this.updateTodoHandler}>
          Update Todo
        </Button>
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
  purchaseCancel: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(UpdateTodoForm);
