import React, { Component } from "react";
import axios from "axios";

import Aux from "../../hoc/Aux";
import GetTodos from "../../components/GetTodos/GetTodos";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";

import "./Todos.css";
import "../../components/UI/Button/Button.css";

class Todos extends Component {
  state = {
    todos: [],
    id: null,
    title: "",
    body: "",
    completed: "",
    error: false,
    purchaising: false,
    add: true
  };

  componentDidMount() {
    // Todoリストの表示処理
    axios
      .get("/api/todos")
      .then(response => {
        this.setState({ todos: response.data });
        console.log("res : ", response.data);
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  // Modalの表示切り替え処理
  purchaisingHandler = () => {
    this.setState({ purchaising: true });
  };

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

  // Todoが選択された時の処理
  selectedTodoHandler = id => {
    this.setState({ add: false });
    this.purchaisingHandler();
    this.setState({
      id: id,
      title: this.state.todos[id-1].title,
      // title: this.state.todos.forEach(todo => {
      //   if (todo.id === id) {
      //     return todo.title;
      //   }
      // }),
      body: this.state.todos[id - 1].body,
      completed: this.state.todos[id - 1].completed
    });
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

  deleteTodoHandler = () => {
    axios.delete("/api/todos/" + this.state.id);

    this.setState({ id: null, title: "", body: "", completed: "" });
    this.purchaseCancelHandler();
  };

  render() {
    let todos = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      todos = this.state.todos.map(todo => {
        return (
          <GetTodos
            key={todo.id}
            id={todo.id}
            title={todo.title}
            body={todo.body}
            clicked={() => this.selectedTodoHandler(todo.id)}
          />
        );
      });
    }

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
                  onChange={event =>
                    this.setState({ completed: event.target.value })
                  }
                >
                  <option value="true">TRUE</option>
                  <option value="false">FALSE</option>
                </select>
              </Aux>
            )}
            {this.state.add ? null : (
              <Button btnType="Delete" clicked={this.deleteTodoHandler}>
                DELETE
              </Button>
            )}
            <Button
              btnType="Add"
              clicked={
                this.state.add ? this.postTodoHandler : this.putTodoHandler
              }
            >
              {this.state.add ? "ADD" : "CHANGE"}
            </Button>
          </div>
        </Modal>

        <section className="Todos">{todos}</section>

        <div className="BuildControl">
          <Button btnType="Add" clicked={this.purchaisingHandler}>
            +
          </Button>
        </div>
      </Aux>
    );
  }
}

export default Todos;
