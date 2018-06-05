import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import PageHeader from './components/PageHeader';
import MenuModal from './components/Modals/MenuModal';

/*** containers ***/
import PrivateRoute from "./components/Wrappers/PrivateRoute";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import { NotFound } from "./components/NotFound/NotFound";
import ErrorModal from './components/Modals/ErrorModal';
import { AUTH_USER } from "./constants/authConst";
import AccountSettings from './containers/Account/AccountSettings';
import AccountChanges from './containers/AccountChanges';
import ReferFriend from './containers/Account/ReferFriend';

class App extends Component {
   render() {
     console.log("test");
    return [
      <ErrorModal key={1} />,
      this.props.authStatus === AUTH_USER ? <PageHeader key={3}/> : null,
      <MenuModal key={4}/>,
      <Switch key={2}>
        <Route exact path={`/login`} component={Login} />
        <Route exact path={`/sign-up`} component={SignUp} />
        <Route exact path={`/account-changes`} component={AccountChanges}/>
        <PrivateRoute exact path={`/`} component={Home} />
        <PrivateRoute exact path={`/account-settings`} component={AccountSettings}/>
        <PrivateRoute exact path={`/refer-a-friend`} component={ReferFriend}/>
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
};

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App));

/*** Props Types ***/
App.propTypes = {
  isLoading: PropTypes.bool
};
