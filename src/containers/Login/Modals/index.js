import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ResetPasswordModal from "./ResetPasswordModal";
import SuccessResetPasswordModal from "./SuccessResetPasswordModal";

class Modals extends React.Component{
  render(){
    return(
      <ModalsBody>
        <ResetPasswordModal/>
        <SuccessResetPasswordModal/>
      </ModalsBody>
    );
  }
}

Modals.propTypes = {
  loginModal: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    loginModal: state.modals.loginModal
  }
};

const mapStateToDispatch = {

};

export default connect(mapStateToProps, mapStateToDispatch)(Modals);

const ModalsBody = styled.div`
  position: relative;
`;