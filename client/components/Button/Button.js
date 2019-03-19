import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = props => (
  <button className={props.btnType} onClick={props.clickButton}>
    {props.children}
  </button>
);

Button.propTypes = {
  btnType: PropTypes.string,
  clickButton: PropTypes.func.isRequired
};

export default Button;
