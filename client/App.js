import React, { Component } from "react";

class App extends Component {
  componentDidMount() {
    fetch("/api/todos")
      .then(response => {
        return response.json();
      })
      .then(todos => {
        console.log(todos);
      });
  }

  render() {
    return (
      <div>
        <h1>Hello TODO APP!!</h1>
      </div>
    );
  }
}

export default App;
