import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled, {css} from "styled-components";
import { Redirect } from "react-router-dom";
import { Header } from "../../components/Header";
import FormSignIn from "./FormSignIn";
import { AUTH_USER } from "../../constants/authConst";
// import SlideModalToLeft from "../../components/Modals/SlideModalToLeft";
// import SendEmailResetPassword from "../ResetPassword/SendEmailResetPassword";
import Modals from './Modals';
import { getModalStatus } from "../../helpers/getModalStatus";
import QRCode from '../../components/QRCode';

class Login extends Component {
  render() {
    const isHide = getModalStatus(this.props.loginModal);
    if (this.props.authStatus === AUTH_USER) {
      return <Redirect to={{ pathname: `/` }} />;
    }

    return [
      <Modals key={1}/>,
      <LoginBody key={2} hide={isHide}>
        <Header toggle={true} headerText={"Log In"} />
        <FormSignIn toggleToLeftModal={this.toggleToLeftModal}/>

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
    loginModal: state.modals.loginModal,
  };
};

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(Login);

const LoginBody = styled.div`
 transition: all 0.3s ease-in-out;
 height: 100vh;
  ${props => props.hide && css`
    margin-left: -100vw;
  `};
  display: flex;
  flex-direction: column;
`;
