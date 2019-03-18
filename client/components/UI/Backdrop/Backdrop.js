import React from "react";
import PropTypes from "prop-types";

import "./Backdrop.css";

const Backdrop = props =>
  props.shown ? (
    <div className="backdrop" onClick={props.clickBackdrop} />
  ) : null;

Backdrop.propTypes = {
  shown: PropTypes.bool.isRequired,
  clickBackdrop: PropTypes.func.isRequired
};

export default Backdrop;
