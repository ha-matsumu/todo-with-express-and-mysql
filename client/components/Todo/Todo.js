import React from "react";

import "./Todo.css";

const todo = props => (
  <article className="todo">
    <h1>{props.title}</h1>
  </article>
);

export default todo;
