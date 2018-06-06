import React from "react";
import styled from "styled-components";
import {withRouter} from 'react-router-dom';
import SlideModalToLeft from "../../components/Modals/SlideModalToLeft";
import { TextNode } from "../../components/Modals/TextNode";
import { AdditionalTextNode } from "../../components/Modals/AdditionalTextNode";
import {getUrlParams} from "../../helpers/getUrlParams";
import {verifyEmail} from "../../actions/verifyEmail";

class VerifyEmail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            message: ""
        }
    }
    componentDidMount(){
        const urlParams = getUrlParams(this.props.location);
        console.log("urlParams", urlParams);
        if(urlParams.oobCode){
            verifyEmail(urlParams.oobCode)
                .then(() => {
                    this.setState({
                        show: true
                    });
                })
                .catch((err) => {
                    console.log("err", err);
                    this.setState({
                        show: true,
                        message: err.message
                    });
                });
        }
    }
  render() {
    return (
      <SlideModalToLeft show={this.state.show} backToLogin={true}>
          {this.state.message && this.state.show ? (
              <TextNode>{this.state.message}</TextNode>
          ) : [
              <TextNode key={1}>Your email address has been confirmed!</TextNode>,
              <AdditionalTextNodeFontSize key={2}>
              If you have already confirmed your mobile number <br />
              using the Google Authenticator app, you are ready<br />
              to log in! If you have not yet confirmed your mobile<br />
              number, please follow the rest of the instructions in<br />
              the email we sent you.
              </AdditionalTextNodeFontSize>
          ]}

      </SlideModalToLeft>
    );
  }
}

VerifyEmail.propTypes = {};

export default withRouter(VerifyEmail);

const AdditionalTextNodeFontSize = styled(AdditionalTextNode)`
  font-size: 14px;
  margin-top: 23px;
`;
