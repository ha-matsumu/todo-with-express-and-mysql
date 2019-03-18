import React from "react";
import PropTypes from "prop-types";

import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => (
  <>
    <Backdrop shown={props.shown} clickBackdrop={props.closeModal} />
    <div
      className="modal"
      style={{
        transform: props.shown ? "translateY(-100px)" : "translateY(-100vh)",
        opacity: props.shown ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </>
);

Modal.propTypes = {
  shown: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
