import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { connect } from "react-redux";
import SlideModalToLeft from "./SlideModalToLeft";
import { TextNode } from "./TextNode";
import { AdditionalTextNode } from "./AdditionalTextNode";
import {toggleErrorModal} from "../../actions/modals/errorModal";

const ErrorModal = props => {
  return (
    <ErrorModalBody
      show={props.isShowErrorModal}
      toggleToLeftModal={props.toggleErrorModal}
    >
      <TextNode>{props.errorCode}</TextNode>
      <AdditionalTextNode>{props.errorMessage}</AdditionalTextNode>
    </ErrorModalBody>
  );
};

ErrorModal.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorMessage: PropTypes.string,
  isShowErrorModal: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isShowErrorModal: state.modals.errorModal.isShowErrorModal,
    errorCode: state.modals.errorModal.errorCode,
    errorMessage: state.modals.errorModal.errorMessage
  };
};

const mapStateToDispatch = {
  toggleErrorModal
};

export default connect(mapStateToProps, mapStateToDispatch)(ErrorModal);


const ErrorModalBody = styled(SlideModalToLeft)`
  z-index: 999;
`;