import React, { Component } from "react";

class App extends Component {
  render() {
    fetch("/api/todos")
      .then(response => {
        return response.json();
      })
      .then(todo => {
        console.log(todo);
      });

    return <div>Hello TODO APP!!</div>;
  }
}

export default App;
