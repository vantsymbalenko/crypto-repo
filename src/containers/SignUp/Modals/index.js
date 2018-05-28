import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SuccessModal } from "./SuccessModal";
import { toggleSignUpSuccessModal } from "../../../actions/modals/signUpModals";
import { getModalStatus } from "../../../helpers/getModalStatus";

class Modals extends React.Component {
  render() {
    const isShowModals = getModalStatus(this.props.signUpModalsStatus);
    return (
      <ModalsBody isShowModals={isShowModals}>
          <SuccessModal
            isShowModal={this.props.signUpModalsStatus.isShowSignUpSuccessModal}
            toggleToLeftModal={this.props.toggleSignUpSuccessModal}
          />
      </ModalsBody>
    );
  }
}

Modals.propTypes = {
  signUpModalsStatus: PropTypes.shape({
    isShowSignUpSuccessModal: PropTypes.bool
  }),
  toggleSignUpSuccessModal: PropTypes.func
};

const mapStateToProps = state => ({
  signUpModalsStatus: state.modals.signUpModal
});

const mapStateToDispatch = {
  toggleSignUpSuccessModal
};

export default connect(mapStateToProps, mapStateToDispatch)(Modals);

const ModalsBody = styled.div``;
