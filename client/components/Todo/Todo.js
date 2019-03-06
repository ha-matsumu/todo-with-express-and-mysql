import React from "react";

import "./Todo.css";

const todo = props => (
  <article className="Todo">
    <h1>{props.title}</h1>
  </article>
);

export default todo;
