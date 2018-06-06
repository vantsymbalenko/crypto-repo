import React from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/*** containers ***/
import { MenuItem } from "../Menu/MenuItem";

/*** actions ***/
import { toggleMenu } from "../../actions/modals/toggleMenu";
import { signOut } from "../../actions/auth/logout/signOut";

/*** else ***/
import { menuRoutes, additionalMenuRoutes } from "../../constants/menuRoutes";
import imgLogoSrc from "../../images/logo.png";
import profileFotoImgSrc from "../../images/foto.png";

class MenuModal extends React.Component {
  close = e => {
    if (this.menuList && !this.menuList.contains(e.target)) {
      this.props.toggleMenu();
    }
  };
  render() {
    const { firstName, lastName } = this.props.usersData;
    return (
      <MenuBody
        isShowMenuModal={this.props.isShowMenuModal}
        onClick={this.close}
      >
        <Menu
          isShowMenuModal={this.props.isShowMenuModal}
          innerRef={node => (this.menuList = node)}
        >
          <LogoRoute to={`/`}>
            <ImgLogo src={imgLogoSrc} />
          </LogoRoute>
          <MenuList>
            {menuRoutes.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  title={item.title}
                  route={item.route}
                  external={item.external}
                />
              );
            })}
          </MenuList>
          <AccountSettings>
            <ProfileBlock to={`/account-settings`}>
              <ProfileFoto>
                <ImgProfile
                  src={this.props.usersData.imgSrc || profileFotoImgSrc}
                />
              </ProfileFoto>
              <UserTitle>
                <UserName>{`${firstName} ${lastName}`}</UserName>
                <Text>Account Settings</Text>
              </UserTitle>
            </ProfileBlock>
            <AdditionalLinks>
              {additionalMenuRoutes.map((item, index) => {
                if (item.title === "Logout") {
                  return (
                    <Button key={index} onClick={this.props.signOut}>
                      {item.title}
                    </Button>
                  );
                }
                return (
                  <MenuItem
                    key={index}
                    title={item.title}
                    route={item.route}
                    external={item.external}
                  />
                );
              })}
            </AdditionalLinks>
            <ReferAFriendLink to={`refer-a-friend`}>
              Refer a Friend
            </ReferAFriendLink>
          </AccountSettings>
        </Menu>
      </MenuBody>
    );
  }
}

MenuModal.propTypes = {
  isShowMenuModal: PropTypes.bool,
  usersData: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isShowMenuModal: state.modals.isShowMenuModal,
    usersData: state.authData.usersData
  };
};

const mapStateToDispatch = {
  toggleMenu,
  signOut
};

export default connect(mapStateToProps, mapStateToDispatch)(MenuModal);

const MenuBody = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 100vh;
  z-index: 999;
  background: none;
  overflow: auto;
  transition: background-color 0.3s ease-in-out;
  ${props =>
    props.isShowMenuModal &&
    css`
      width: 100vw;
      background: rgba(16, 16, 26, 0.5);
    `};
`;

const Menu = styled.div`
  max-width: 297px;
  width: 0;
  height: 100vh;
  background: #10101a;
  overflow: auto;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  ${props =>
    props.isShowMenuModal &&
    css`
      width: 79%;
    `};
`;

const LogoRoute = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 50px;
`;
const MenuList = styled.ul`
  width: 100%;
  text-align: center;
`;

const ImgLogo = styled.img`
  width: 68px;
  height: 35px;
`;

const AccountSettings = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-end;
`;

const ProfileBlock = styled(Link)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
  justify-content: center;
`;

const ProfileFoto = styled.div`
  margin-right: 5px;
`;
const ImgProfile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserTitle = styled.div``;
const UserName = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: 0.8px;
  color: #66688f;
`;

const Text = styled(UserName)`
  font-weight: 300;
`;

const AdditionalLinks = styled(MenuList)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 17px 0 15px 0;
  list-style: none;
  & > li {
    margin: 0 10px;
    text-transform: uppercase;
  }
`;
const ReferAFriendLink = styled(Link)`
  text-decoration: none;
  margin: 0 auto 57px auto;
  width: 198px;
  height: 45px;
  border: solid 0.3px #66688f;
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.6px;
  color: #66688f;
  text-transform: uppercase;
  line-height: 45px;
`;

const Button = styled.button`
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
  background: none;
  border: none;
`;
