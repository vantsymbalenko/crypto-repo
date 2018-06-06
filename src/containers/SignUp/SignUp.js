import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

/*** containers ***/
import Modals from "./Modals";
import FormSignUp from "./FormSignUp";
import { Header } from "../../components/Header";

/*** actions ***/
import { toggleSignUpSuccessModal } from "../../actions/modals/signUpModals";

/*** else ***/
import { getModalStatus } from "../../helpers/getModalStatus";

class SignUp extends Component {
  componentWillUnmount() {
    /*** need firstly for hide left menu when user clicked logout ***/
    if (this.props.signUpModalsStatus) {
      this.props.toggleSignUpSuccessModal();
    }
  }
  render() {
    const isHideContent = getModalStatus(this.props.signUpModalsStatus);
    return (
      <Wrapper>
        <Header headerText={"Sign Up"} toggle={!isHideContent} />,
        <FormSignUp toggle={!isHideContent} />
        <Modals />
      </Wrapper>
    );
  }
}

SignUp.propTypes = {
  toggleSignUpSuccessModal: PropTypes.func
};

const mapStateToProps = state => {
  return {
    signUpModalsStatus: state.modals.signUpModal
  };
};

const mapStateToDispatch = {
  toggleSignUpSuccessModal
};

export default connect(mapStateToProps, mapStateToDispatch)(SignUp);

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
`;
