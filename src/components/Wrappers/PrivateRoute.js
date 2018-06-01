import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Route, Redirect } from "react-router-dom";
import { NOT_AUTH, NONE, REQ } from "../../constants/authConst";
import {getUserStatus} from "../../actions/auth/getUserStatus";
import loading from '../../images/loading.gif';

class PrivateRoute  extends  React.Component{
  componentDidMount(){
    this.props.getUserStatus();
  }
  render(){
    const { component: Component, authStatus,reqStatus, ...rest } = this.props;

    if((authStatus === NOT_AUTH) && (reqStatus === NONE)){
      return <div style={{color: "#fff", fontSize:"48px"}}>
          <img src={loading} alt="sdas" style={{width: "100%", height:"100%"}}/>
      </div>
    }

    if((authStatus === NOT_AUTH) && (reqStatus === REQ)){
      return <Redirect to={`/login`}/>
    }

    return (
      <Route
        {...rest}
        render={props => (<Component {...props} />)}
      />
    );
  }
}

/*** connect to Redux ***/
const mapStateToProps = state => {
  return {
    authStatus: state.authData.authStatus,
    reqStatus: state.authData.reqStatus
  };
};

const mapStateToDispatch = {
  getUserStatus
};

export default withRouter(
  connect(mapStateToProps, mapStateToDispatch)(PrivateRoute)
);

/*** Prop Types ***/
PrivateRoute.propTypes = {
  authStatus: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
};
