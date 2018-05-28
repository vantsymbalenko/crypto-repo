import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Header } from "../../components/Header";
import FormSignUp from "./FormSignUp";
import Modals from "./Modals";
import {getModalStatus} from "../../helpers/getModalStatus";

class SignUp extends Component {
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
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: auto;
`;

const mapStateToProps = state => {
  return {
    signUpModalsStatus: state.modals.signUpModal
  };
};

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(SignUp);

// const Button = styled.button`
//   display: block;
//   width: 100%;
//   max-width: 343px;
//   height: 45px;
//   border: none;
//   border-radius: 4px;
//   text-transform: uppercase;
//   font-family: Helvetica, sans-serif;
//   font-size: 12px;
//   font-weight: 300;
//   font-style: normal;
//   font-stretch: normal;
//   line-height: 1;
//   letter-spacing: 0.8px;
//   color: #ffffff;
//   background: #1f1f2f;
//   position: absolute;
//   left: 0;
//   right: 0;
//   bottom: 45px;
//   margin: auto;
//   &:hover{
//     cursor:pointer;
//   }
// `;
