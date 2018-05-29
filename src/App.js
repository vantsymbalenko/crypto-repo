import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";
import {fire} from "./FirebaseConfig/Fire";

/*** containers ***/
import PrivateRoute from "./components/Wrappers/PrivateRoute";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import { NotFound } from "./components/NotFound/NotFound";
import VerifyEmail from "./components/VerifyEmail";
import ErrorModal from './components/Modals/ErrorModal';

class App extends Component {
    componentDidMount(){
        fire.auth().onAuthStateChanged((user) => {
            console.log("user", user);
            if(user){

            }
        })
    }
   render() {
    return [
      <ErrorModal key={1} />,
      <Switch key={2}>
        <Route exact path={`/login`} component={Login} />
        <Route exact path={`/sign-up`} component={SignUp} />
        <Route exact path={`/verify-email`} component={VerifyEmail}/>
        <PrivateRoute exact path={`/`} component={Home} />
        <Route component={NotFound} />
      </Switch>
    ];
  }
}

/*** connect ***/
const mapStateToProps = state => {
  return {
    isLoading: state.appData.isLoading
  };
};

const mapStateToDispatch = {};

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(App));

/*** Props Types ***/
App.propTypes = {
  isLoading: PropTypes.bool
};
