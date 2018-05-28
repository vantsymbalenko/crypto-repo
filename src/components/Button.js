import styled from "styled-components";

export const Button = styled.button`
  display: block;
  width: 100%;
  max-width: 343px;
  height: 45px;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  font-family: Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.8px;
  color: #ffffff;
  background-image: linear-gradient(to top, #4eace0, #2a64b4);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 45px;
  margin: auto;
  &:hover {
    cursor: pointer;
  }
  &[disabled] {
    background: #1f1f2f;
  }
`;
