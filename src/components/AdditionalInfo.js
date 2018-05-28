import styled, { css } from "styled-components";

export const AdditionalInfo = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 9px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.56;
  letter-spacing: normal;
  color: #66688f;
  margin: 20px auto;
  text-align: center;
  ${props =>
  props.toBottom &&
  css`
      position: absolute;
      bottom: 77px;
      width: 100%;
      left: 0;
    `};
`;