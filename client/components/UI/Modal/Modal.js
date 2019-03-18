import React from "react";
import PropTypes from "prop-types";

import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => (
  <>
    <Backdrop show={props.show} clickBackdrop={props.closeModal} />
    <div
      className="modal"
      style={{
        transform: props.show ? "translateY(-100px)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
