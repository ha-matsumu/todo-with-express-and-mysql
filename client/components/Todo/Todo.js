import React from "react";
import PropTypes from "prop-types";

import "./Todo.css";

const Todo = props => (
  <article className="todo">
    <h1>{props.title}</h1>
  </article>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
};

export default Todo;
