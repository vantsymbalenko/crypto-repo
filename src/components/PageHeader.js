import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {toggleMenu} from "../actions/modals/toggleMenu";

class PageHeader extends React.Component{
    render(){
        return(
            <PageHeaderBody>
                <MenuIconButton onClick={this.props.toggleMenu}>
                   <Bar/>
                   <Bar/>
                   <Bar/>
                </MenuIconButton>
                <PageTitle>Smart Wallet</PageTitle>
            </PageHeaderBody>
        );
    }
}

PageHeader.propTypes = {};

const mapStateToProps = () => {
  return {

  }
};

const mapStateToDispatch = {
  toggleMenu
};

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(PageHeader));

const PageHeaderBody = styled.div`
  position: relative;
  padding: 48px 21px;
  display: flex;
  flex-direction: row;
`;

const MenuIconButton = styled.button`
  width: 21px;
  height: 15px;
  display: inline-block;
  cursor: pointer;
  border: none;
  background: none;
`;

const Bar = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ffffff;
    margin: 5px 0;
    transition: 0.4s;
`;

const PageTitle = styled.div`
  width: 100%;
  text-align:center;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.8px;
  color: #ffffff;
  text-transform: uppercase;
`;