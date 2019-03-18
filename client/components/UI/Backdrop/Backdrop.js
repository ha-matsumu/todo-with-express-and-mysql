import React from "react";
import PropTypes from "prop-types";

import "./Backdrop.css";

const Backdrop = props =>
  props.hidden ? (
    <div className="backdrop" onClick={props.clickBackdrop} />
  ) : null;

Backdrop.propTypes = {
  hidden: PropTypes.bool.isRequired,
  clickBackdrop: PropTypes.func.isRequired
};

export default Backdrop;
