import React, { Component } from "react";
import axios from 'axios';

import Modal from "../../UI/Modal/Modal";

const WithErrorHandler = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        shown: false,
        error: null
      };
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ shown: true, error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    hideModalHandler = () => {
      this.setState({ shown: false, error: null });
    };

    render() {
      return (
        <>
          <Modal
            shown={this.state.shown}
            hideModalHandler={this.hideModalHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default WithErrorHandler;
