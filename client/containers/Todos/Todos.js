import React, { Component } from "react";
import axios from "axios";

import Aux from "../../hoc/Aux";
import GetTodos from "../../components/GetTodos/GetTodos";
import Button from "../../components/UI/Button/Button";
import InputField from "../../components/InputField/InputField";

import "./Todos.css";
import "../../components/UI/Button/Button.css";

class Todos extends Component {
  state = {
    todos: [],
    id: null,
    title: "",
    body: "",
    completed: "",
    // selectedTodo: {},
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

  // Todoが選択された時の処理
  selectedTodoHandler = id => {
    this.setState({ add: false });
    this.purchaisingHandler();
    this.setState({
      id: id,
      title: this.state.todos[id - 1].title,
      body: this.state.todos[id - 1].body,
      completed: this.state.todos[id - 1].completed
    });
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
        <InputField
          purchaising={this.state.purchaising}
          add={this.state.add}
          id={this.state.id}
          title={this.state.title}
          body={this.state.body}
          completed={this.state.completed}
        />
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
