import React from "react";

import "./GetTodos.css";

const getTodos = props => (
  <article className="GetTodos" onClick={props.clicked}>
    <h1>{props.title}</h1>
  </article>
);

export default getTodos;
