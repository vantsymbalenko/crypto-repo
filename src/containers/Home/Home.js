import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {fire} from "../../FirebaseConfig/Fire";

export default class Home extends Component {
  render() {
    return(
        <HomeBody>
            <div style={{color: "#fff", fontSize: "48px"}}>Home</div>
        </HomeBody>
    );
  }
}

Home.propTypes = {};

const HomeBody = styled.div`
  position: relative;
  font-size: 24px;
  color: white;
  text-align: center;
`;
