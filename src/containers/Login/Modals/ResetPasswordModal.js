import React from 'react';
import PropTypes from 'prop-types';
import SlideModalToLeft from '../../../components/Modals/SlideModalToLeft';
import {Input} from "../../../components/Input";
import {AdditionalInfo} from "../../../components/AdditionalInfo";
import {Button} from "../../../components/Button";
import styled from "styled-components";
import { PRESIGN_IN } from "../../../constants/authConst";
import { emailRule } from "../../../validationRules/rules";
import Validation from "react-validation-utils/build/index";
import getBorderColor from "../../../helpers/getBorderColor";
import { connect } from "react-redux";
import { sendPasswordResetEmail } from "../../../actions/sendPasswordResetEmail";
import {toggleResetPasswordModal} from "../../../actions/modals/loginModals";

const Validator = new Validation({
  email: {
    rule: emailRule,
    message: "Email is incorrect"
  }
});

class ResetPasswordModal extends React.Component{

  constructor(props) {
    super(props);
    this.state = Validator.addValidation({
      email: ""
    });
    this.getBorderColor = getBorderColor.bind(this);
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState(Validator.validate({ [name]: value }));
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.sendPasswordResetEmail(this.state.email);
  };

  render (){
    return(
      <SlideModalToLeft
        show={this.props.isShowLoginResetPasswordModal}
        toggleToLeftModal={this.props.toggleResetPasswordModal}
      >
        <Form>
          <Input
            labelText={"Email Address"}
            placeholder={`enter the email address you used to sign up`}
            name={`email`}
            onChange={this.onChange}
            borderColor={this.getBorderColor(`email`)}
            value={this.state.email}
            marginTop={`28%`}
          />
          <AdditionalInfo toBottom>
            Reset instructions will be sent to your email address
          </AdditionalInfo>
          <Button type={`submit`} onClick={this.onSubmit} disabled={this.props.authStatus === PRESIGN_IN}>
            send email with reset instructions
          </Button>
        </Form>
      </SlideModalToLeft>
    );
  }
}
ResetPasswordModal.propTypes = {
  authStatus: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    authStatus: state.authData.authStatus,
    isShowLoginResetPasswordModal: state.modals.loginModal.isShowLoginResetPasswordModal
  }
};

const mapStateToDispatch = {
  sendPasswordResetEmail,
  toggleResetPasswordModal
};

export default connect(mapStateToProps, mapStateToDispatch)(ResetPasswordModal);

const Form = styled.form`
  padding: 17px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;