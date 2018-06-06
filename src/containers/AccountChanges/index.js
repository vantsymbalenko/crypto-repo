import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUrlParams} from '../../helpers/getUrlParams';
import VerifyEmail from './VerifyEmail';

class AccountChanges extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...getUrlParams(this.props.location)
        }
    }
    render(){
        switch (this.state.mode){
            case 'resetPassword':
                // Display reset password handler and UI.
                console.log("resetPassword");
                return null;
                // return <PasswordReset/>;
            case 'recoverEmail':
                // Display email recovery handler and UI.
                console.log("recoverEmail");
                return null;
            case 'verifyEmail':
                // Display email verification handler and UI.
                return <VerifyEmail/>;
            default:
                console.log("default");
                return null;
            // Error: invalid mode.
        }
    }
}

AccountChanges.propTypes = {};

export default withRouter(AccountChanges);
