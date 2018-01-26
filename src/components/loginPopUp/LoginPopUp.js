import React, { Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import _map from 'lodash/map';

//Actions
import {
  loginUser,
} from '../../actions';


import './LoginPopUp.css';

const userCreds = {
  bandana147: {
    name: 'Bandana',
    username: 'bandana147',
    password: 'Test123%23',
  },
  haley1991: {
    name: 'Haley',
    username: 'haley1991',
    password: 'Test12345',
  },
};

class LoginModal extends Component {

  onClickLoginWithUserOne = event => {
    const username = event.currentTarget.dataset.user;
    this.props.loginUser(username, userCreds[username].password);
  };

  render() {
    return (
      <div className="login-main">
        <div className="login-header">
          <span>Login</span>
          <span onClick={this.props.onCloseLoginPopUp} className="login-close">X</span>
        </div>
        <div className="login-body">
          {_map(userCreds, user => (
            <div data-user={user.username} className="login-body__item" onClick={this.onClickLoginWithUserOne}>
              Login with {user.username}
            </div>))
          }
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
  loginSuccessful: PropTypes.bool,
  loginUser: PropTypes.func,
};

const mapStateToProps = ({ movies: { loginSuccessful = {} }}) => ({
  loginSuccessful,
});

export default connect(
  mapStateToProps, {
    loginUser,
  }
)(LoginModal);
