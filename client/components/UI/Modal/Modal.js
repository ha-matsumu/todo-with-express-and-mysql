import React from "react";
import PropTypes from "prop-types";

import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => (
  <>
    <Backdrop hidden={props.hidden} clickBackdrop={props.closeModal} />
    <div
      className="modal"
      style={{
        transform: props.hidden ? "translateY(-100px)" : "translateY(-100vh)",
        opacity: props.hidden ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </>
);

Modal.propTypes = {
  hidden: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
