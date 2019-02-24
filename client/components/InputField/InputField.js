import React, { Component } from "react";
import axios from "axios";

import Aux from "../../hoc/Aux";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import "./InputField.css";

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
      body: "",
      completed: "",
      purchaising: false,
      add: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      purchaising: nextProps.purchaising,
      add: nextProps.add,
      id: nextProps.id,
      title: nextProps.title,
      body: nextProps.body,
      completed: nextProps.completed
    });
  }

  // Modalの表示切り替え処理
  purchaseCancelHandler = () => {
    this.setState({
      id: null,
      title: "",
      body: "",
      completed: "",
      purchaising: false,
      add: true
    });
  };

  // Todoの追加処理
  postTodoHandler = () => {
    const defaultData = {
      title: this.state.title,
      body: this.state.body
    };
    axios.post("/api/todos", defaultData);

    this.setState({ title: "", body: "" });
    this.purchaseCancelHandler();
  };

  // Todoの更新処理
  putTodoHandler = () => {
    const defaultData = {
      title: this.state.title,
      body: this.state.body,
      completed: this.state.completed
    };

    axios.put("/api/todos/" + this.state.id, defaultData);

    this.setState({ id: null, title: "", body: "", completed: "" });
    this.purchaseCancelHandler();
  };

  render() {
    return (
      <Aux>
        <Modal
          show={this.state.purchaising}
          modalClosed={this.purchaseCancelHandler}
        >
          <div className="FormTodo">
            <button className="button" onClick={this.purchaseCancelHandler}>
              ×
            </button>

            <h1>{this.state.add ? "ADD TODO" : "CHANGE TODO"}</h1>

            <label>
              Title
              <input
                type="text"
                value={this.state.title}
                onChange={event => this.setState({ title: event.target.value })}
              />
            </label>

            <label>
              Body
              <textarea
                rows="4"
                value={this.state.body}
                onChange={event => this.setState({ body: event.target.value })}
              />
            </label>

            {this.state.add ? null : (
              <Aux>
                <label>Completed</label>
                <select
                  value={this.state.completed}
                  onChange={this.handleChange}
                >
                  <option value="true">TRUE</option>
                  <option value="false">FALSE</option>
                </select>
              </Aux>
            )}

            {this.state.add ? null : (
              // <Button btnType="Delete" clicked={this.deleteTodoHandler}>
              <Button btnType="Delete">DELETE</Button>
            )}

            <Button
              btnType="Add"
              clicked={
                this.state.add ? this.postTodoHandler : this.putTodoHandler
              }
              disabled={this.state.title ? null : "disabled"}
            >
              {this.state.add ? "ADD" : "CHANGE"}
            </Button>
          </div>
        </Modal>
      </Aux>
    );
  }
}

export default InputField;
