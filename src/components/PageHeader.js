import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';

class PageHeader extends React.Component{
    render(){
        return(
            <PageHeaderBody>
                <MenuIcon>
                   <Bar/>
                   <Bar/>
                   <Bar/>
                </MenuIcon>

            </PageHeaderBody>
        );
    }
}

PageHeader.propTypes = {};

export default withRouter(PageHeader);

const PageHeaderBody = styled.div`
  position: relative;
  padding: 51px 21px;
  display: inline-block;
`;

const MenuIcon = styled.button`
  width: 21px;
  height: 15px;
  display: inline-block;
  cursor: pointer;
`;

const Bar = styled.div`
    width: 100%;
    height: 5px;
    background-color: #333;
    margin: 5px 0;
    transition: 0.4s;
`;