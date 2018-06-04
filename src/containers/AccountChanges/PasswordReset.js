import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {getUrlParams} from '../../helpers/getUrlParams';
import {firebaseFirestore} from "../../FirebaseConfig/Fire";
import {FIREBASE_COLLECTION_USER} from '../../constants/appConst'

class PasswordReset extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            message: ""
        };
    }
    componentDidMount(){
        console.log("password reset component Did mount")
        // this.setState({
        //     ...getUrlParams(this.props.location),
        //     show: !this.state.show
        // });
    }
    render(){
        return null;
    }
}

export default withRouter(PasswordReset)

