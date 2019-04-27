import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Backdrop
          shown={this.props.shown}
          clickBackdrop={this.props.hideModalHandler}
        />
        <div
          className="modal"
          style={{
            transform: this.props.shown
              ? "translateY(-100px)"
              : "translateY(-200vh)",
            opacity: this.props.shown ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

Modal.propTypes = {
  shown: PropTypes.bool.isRequired,
  hideModalHandler: PropTypes.func.isRequired
};

export default Modal;
