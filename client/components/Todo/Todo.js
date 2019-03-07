import React from "react";

import "./Todo.css";

const Todo = props => (
  <article className="todo">
    <h1>{props.title}</h1>
  </article>
);

export default Todo;
