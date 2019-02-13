import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Index extends Component {
  componentDidMount() {
    axios
      .get("/api/todos")
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
  
  render() {
    return (
      <div>
        <h1>Todo</h1>
        <p>express × react 環境構築</p>
      </div>)
    ;
  }
}

ReactDOM.render(<Index />, document.getElementById("index"));
