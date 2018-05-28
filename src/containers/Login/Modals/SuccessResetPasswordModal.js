import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SlideModalToLeft from "../../../components/Modals/SlideModalToLeft";
import { toggleSuccessResetPasswordModal } from "../../../actions/modals/loginModals";
import {TextNode} from "../../../components/Modals/TextNode";
import {AdditionalTextNode} from "../../../components/Modals/AdditionalTextNode";
import {Button} from "../../../components/Button";

const SuccessResetPasswordModal = props => {
  return (
    <SlideModalToLeft
      show={props.isShowLoginSuccessResetPasswordModal}
      toggleToLeftModal={props.toggleSuccessResetPasswordModal}
    >
      <TextNode>
        We just you an email with instructions for<br/>
        resetting your password.
      </TextNode>
      <AdditionalTextNode>
        If you haven’t received the email within two<br/>
        minutes, please check your spam folder. If you still<br/>
        cant see it, resend the email
      </AdditionalTextNode>
      <Button>log in now</Button>
    </SlideModalToLeft>
  );
};

SuccessResetPasswordModal.propTypes = {
  isShowLoginSuccessResetPasswordModal: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isShowLoginSuccessResetPasswordModal:
      state.modals.loginModal.isShowLoginSuccessResetPasswordModal
  };
};

const mapStateToDispatch = {
  toggleSuccessResetPasswordModal
};

export default connect(mapStateToProps, mapStateToDispatch)(
  SuccessResetPasswordModal
);
