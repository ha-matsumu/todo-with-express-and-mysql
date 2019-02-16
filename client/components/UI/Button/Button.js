import React from "react";

import "./Button.css";

const button = props => (
  <button className={["Button", props.btnType].join(" ")} onClick={props.clicked}>
    <span>{props.children}</span>
  </button>
);

export default button;
