import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { Redirect } from "react-router-dom";

/*** containers ***/
import FormSignIn from "./FormSignIn";
import Modals from "./Modals";

/*** components ***/
import { Header } from "../../components/Header";

/*** else ***/
import { AUTH_USER } from "../../constants/authConst";
import { getModalStatus } from "../../helpers/getModalStatus";

class Login extends Component {
  render() {
    const isHide = getModalStatus(this.props.loginModal);
    if (this.props.authStatus === AUTH_USER) {
      return <Redirect to={{ pathname: `/` }} />;
    }

    return [
      <Modals key={1} />,
      <LoginBody key={2} hide={isHide}>
        <Header toggle={true} headerText={"Log In"} />
        <FormSignIn toggleToLeftModal={this.toggleToLeftModal} />
      </LoginBody>
    ];
  }
}

Login.propTypes = {
  authStatus: PropTypes.string
};

const mapStateToProps = state => {
  return {
    authStatus: state.authData.authStatus,
    loginModal: state.modals.loginModal
  };
};

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(Login);

const LoginBody = styled.div`
  transition: all 0.3s ease-in-out;
  height: 100vh;
  ${props =>
    props.hide &&
    css`
      margin-left: -100vw;
    `};
  display: flex;
  flex-direction: column;
`;
