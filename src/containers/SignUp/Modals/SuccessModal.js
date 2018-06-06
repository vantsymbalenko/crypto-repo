import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import SlideModalToLeft from "../../../components/Modals/SlideModalToLeft";
import {TextNode} from "../../../components/Modals/TextNode";
import {AdditionalTextNode} from "../../../components/Modals/AdditionalTextNode";
import {Button} from "../../../components/Button";

export const SuccessModal = (props) => {
  console.log("isShoModal", props.isShowModal);
  return(
    <SlideModalToLeft
      show={props.isShowModal}
      toggleToLeftModal={props.toggleToLeftModal}
    >
      <TextNode>
        Thanks for signing up to DRIP Beta!
        <br/>
        <br/>
        Before you can log in, we need to confirm your
        email address and mobile number. Please
        check the email we just sent you.
      </TextNode>
      <AdditionalTextNode>
        If you haven’t received the email within two<br/>
        minutes, please check your spam folder. If you still<br/>
        cant see it, resend the email
      </AdditionalTextNode>
      <Link to={`/login`}>
        <Button>
          Log in now
        </Button>
      </Link>
    </SlideModalToLeft>
  );
};

SuccessModal.propTypes = {
  isShowModal: PropTypes.bool,
  toggleToLeftModal: PropTypes.func
};
