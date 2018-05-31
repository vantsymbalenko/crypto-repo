import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export const MenuItem = (props) => {
  return(
    <LiItem>
      {props.externalLink ? (
          <MenuItemExternal href={props.route}>
            {props.title}
          </MenuItemExternal>
        ) : (
          <MenuItemInside to={props.route}>
            {props.title}
          </MenuItemInside>
        )
      }
    </LiItem>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  externalLink: PropTypes.bool,
  route: PropTypes.string
};

const LiItem = styled.li`
  margin-top:32px;
`;
const styleForLink = () => css`
  text-transform: uppercase;
  font-family: Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.6px;
  color: #66688f;
  text-decoration: none;
`;

const MenuItemExternal = styled.a`
  ${styleForLink()}
`;

const MenuItemInside = styled(Link)`
  ${styleForLink()}
`;

