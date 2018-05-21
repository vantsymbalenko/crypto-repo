import React from 'react';
import PropTypes from 'prop-types';
import logoImgSrc from '../images/logo.png';
import styled from 'styled-components';

export const Header = (props) => {
  return(
    <HeaderNode>
      <Image src = {logoImgSrc}/>
      <TextNode>{props.headerText}</TextNode>
    </HeaderNode>
  );
};

Header.propTypes = {
  headerText : PropTypes.string
};

const HeaderNode = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 56px;
`;
const Image = styled.img`
  height: 42px;
  width: 81px;
  float: left;
`;

const TextNode = styled.span`
  font-family: 'Helvetica Light', sans-serif;
  font-size : 14px;
  letter-spacing: 0.8px;
  color: #fff;
  text-transform: uppercase;
  margin-left: 20px;
`;