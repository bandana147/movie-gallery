import React, { Component} from 'react';
import PropTypes from 'prop-types';

import './LoginPopUp.css';

class LoginModal extends Component {
  state = {
    username: '',
    password: '',
  };

  onClickLogin = () => {

  };

  onChangeUserName= (event) => {
    const username = event.currentTarget.value;

    this.setState({
      username,
    });
  };

  onChangePassword = (event) => {
    const password = event.currentTarget.value;

    this.setState({
      password,
    });
  };

  render() {
    return (
      <div className="login-main">
        <div className="login-header"><span>Login</span> <span onClick={this.props.onCloseLoginPopUp} className="login-close">X</span></div>
        <div className="login-body">
          <div className="login-body__item"> Username: <input className="login-body__item-input" type="text" onChange={this.onChangeUserName} placeholder="Enter Username"/></div>
          <div className="login-body__item"> Password: <input className="login-body__item-input" type="text" onChange={this.onChangePassword} placeholder="Enter Password"/></div>
        </div>
        <div className="login-footer">
          <button className="login-footer__item" onClick={this.props.onCloseLoginPopUp}>Cancel</button>
          <button className="login-footer__item" onClick={this.onClickLogin}>Login</button>
        </div>
      </div>
    );
  }
}

LoginModal.propTypes = {
  hideLoginPopUp: PropTypes.func,
};

export default LoginModal;