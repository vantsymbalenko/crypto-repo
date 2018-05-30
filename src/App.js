import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import {getUserInfo} from "./actions/auth/getUserInfo";
import {signInSuccess} from "./actions/auth/signInSuccess";
import PageHeader from './components/PageHeader';
import MenuModal from './components/Modals/MenuModal';

/*** containers ***/
import PrivateRoute from "./components/Wrappers/PrivateRoute";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import { NotFound } from "./components/NotFound/NotFound";
import VerifyEmail from "./components/VerifyEmail";
import ErrorModal from './components/Modals/ErrorModal';
import { AUTH_USER } from "./constants/authConst";
import AccountSettings from './containers/Account/AccountSettings';

class App extends Component {
   render() {
    return [
      <ErrorModal key={1} />,
      this.props.authStatus === AUTH_USER ? <PageHeader key={3}/> : null,
      <MenuModal key={4}/>,
      <Switch key={2}>
        <Route exact path={`/login`} component={Login} />
        <Route exact path={`/sign-up`} component={SignUp} />
        <Route exact path={`/verify-email`} component={VerifyEmail}/>
        <PrivateRoute exact path={`/`} component={Home} />
        <PrivateRoute exact path={`/account-settings`} component={AccountSettings}/>
        <Route component={NotFound} />
      </Switch>
    ];
  }
}

/*** connect ***/
const mapStateToProps = state => {
  return {
    isLoading: state.appData.isLoading,
    authStatus: state.authData.authStatus,
    isShowMenuModal: state.modals.isShowMenuModal
  };
};

const mapStateToDispatch = {
  getUserInfo,
  signInSuccess
};

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App));

/*** Props Types ***/
App.propTypes = {
  isLoading: PropTypes.bool
};
