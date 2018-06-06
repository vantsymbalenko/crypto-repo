import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Header } from "../Header";
import { Link } from "react-router-dom";

export default class SlideModalToLeft extends React.Component {
  render() {
    return (
      <ModalBody show={this.props.show} zIndex={this.props.zIndex}>
        {this.props.backToLogin ? (
          <StyledLinkBackToLogin to={`/login`}>
            <svg
              width="22"
              height="17"
              viewBox="0 0 22 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0812 16.4503C10.2951 16.6265 10.6898 16.505 10.6898 16.2484C10.6898 16.172 10.6549 16.1007 10.5858 16.0467L0.860382 8.26565L10.5858 0.484648C10.9129 0.222319 10.3848 -0.171114 10.0812 0.0809617L0.104279 8.06375C-0.0347595 8.17557 -0.0347595 8.35574 0.104279 8.46744L10.0812 16.4503ZM20.8827 8.56802C21.0794 8.57034 21.2362 8.44034 21.239 8.28299C21.2419 8.12222 21.0836 7.99563 20.8827 7.99783H2.35403C1.88077 7.99783 1.88358 8.56802 2.35403 8.56802H20.8827Z"
                transform="translate(-0.00012207 0.00219727)"
                fill="white"
              />
            </svg>
          </StyledLinkBackToLogin>
        ) : (
          <BackButtonArrow onClick={this.props.toggleToLeftModal}>
            <svg
              width="22"
              height="17"
              viewBox="0 0 22 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0812 16.4503C10.2951 16.6265 10.6898 16.505 10.6898 16.2484C10.6898 16.172 10.6549 16.1007 10.5858 16.0467L0.860382 8.26565L10.5858 0.484648C10.9129 0.222319 10.3848 -0.171114 10.0812 0.0809617L0.104279 8.06375C-0.0347595 8.17557 -0.0347595 8.35574 0.104279 8.46744L10.0812 16.4503ZM20.8827 8.56802C21.0794 8.57034 21.2362 8.44034 21.239 8.28299C21.2419 8.12222 21.0836 7.99563 20.8827 7.99783H2.35403C1.88077 7.99783 1.88358 8.56802 2.35403 8.56802H20.8827Z"
                transform="translate(-0.00012207 0.00219727)"
                fill="white"
              />
            </svg>
          </BackButtonArrow>
        )}

        <Header toggle={true} />
        {this.props.children}
      </ModalBody>
    );
  }
}

SlideModalToLeft.defaultProps = {
  padding: `0px`,
  zIndex: `99`,
  backToLogin: false
};

SlideModalToLeft.propTypes = {
  show: PropTypes.bool,
  toggleToLeftModal: PropTypes.func,
  padding: PropTypes.string,
  zIndex: PropTypes.string,
  backToLogin: PropTypes.bool
};

const ModalBody = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 100vw;
  bottom: 0;
  background: #191a2a;
  z-index: ${props => props.zIndex};
  transition: all 0.3s ease-in-out;
  padding: ${props => props.padding};
  display: flex;
  flex-direction: column;
  ${props =>
    props.show &&
    css`
      left: 0;
    `};
`;

const BackButtonArrow = styled.button`
  position: absolute;
  width: 24px;
  height: 20px;
  color: #ffffff;
  top: 47px;
  left: 25px;
  background: none;
  border: none;
`;

const StyledLinkBackToLogin = styled(Link)`
  position: absolute;
  width: 24px;
  height: 20px;
  color: #ffffff;
  top: 47px;
  left: 25px;
  background: none;
  border: none;
`;
