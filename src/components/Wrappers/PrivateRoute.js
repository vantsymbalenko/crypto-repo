import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router-dom";
import { NOT_AUTH } from "../../constants/authConst";

const PrivateRoute = ({ component: Component, authStatus, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authStatus !== NOT_AUTH ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: `/login` }} />
        )
      }
    />
  );
};

/*** connect to Redux ***/
const mapStateToProps = state => {
  return {
    authStatus: state.authData.authStatus
  };
};

const mapStateToDispatch = {};

export default withRouter(
  connect(mapStateToProps, mapStateToDispatch)(PrivateRoute)
);

/*** Prop Types ***/
PrivateRoute.propTypes = {
  authStatus: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};
