import React, { Component } from "react";

import TodoList from "./containers/TodoList/TodoList";

class App extends Component {
  render() {
    return (
      <div>
        <TodoList />
      </div>
    );
  }
}

export default App;
