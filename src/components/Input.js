import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

export const Input = props => {
  return (
    <Block
      width={props.width}
      marginRight={props.marginRight}
      borderColor={props.borderColor}
      marginTop={props.marginTop}
    >
      <Label labelMargin={props.labelMargin}>{props.labelText}</Label>
      <Wrapper rowReverse={props.rowReverse}>
        {props.children}
        <InputNode
          onChange={props.onChange}
          value={props.value}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
        />
      </Wrapper>
    </Block>
  );
};

Input.defaultProps = {
  width: "100%",
  marginRight: "0px",
  borderColor: "#51526b",
  type: "text",
  labelMargin : "24px 0 5px 0",
  rowReverse : false,
  marginTop: "0"
};

Input.propTypes = {
  width: PropTypes.string,
  marginTop: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  borderColor: PropTypes.string,
  marginRight: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  labelMargin : PropTypes.string,
  onChange: PropTypes.func.isRequired,
  rowReverse: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

const Block = styled.div`
  width: ${props => props.width};
  margin-right: ${props => props.marginRight};
  box-shadow: inset 0 -1px 0 0 ${props => props.borderColor};
  margin-top: ${props => props.marginTop}
`;

const Label = styled.label`
  font-family: Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.6px;
  color: #66688f;
  text-transform: uppercase;
  display: block;
  margin: ${props => props.labelMargin};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  ${props => props.rowReverse && 'flex-direction: row-reverse;'}
`;
const InputNode = styled.input`
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  width: 100%;
  height: 54px;
  background: none;
  border: none;
  outline: none;
  display: inline;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus{
    background: none;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
     -webkit-text-fill-color: #ffffff;
     transition: background-color 5000s ease-in-out 0s;
  }
`;
