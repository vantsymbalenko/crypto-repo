import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";

/*** components ***/
import { Input } from "../../components/Input";
import { AdditionalInfo } from "../../components/AdditionalInfo";

/*** else ***/
import { fire } from "../../FirebaseConfig/Fire";
import { HOST } from "../../constants/appConst";

class ReferFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refLink: HOST + "/sign-up?refCode=" + fire.auth().currentUser.uid,
      copied: false
    };
  }
  changeField = e => {
    e.preventDefault();
  };

  render() {
    return (
      <Body>
        <Input
          value={this.state.refLink}
          onChange={this.changeField}
          type={`text`}
          labelMargin={`24px 0 -3px 0`}
          labelText={`this is your referral code`}
          borderColor={`none`}
        />
        <ActionsButtons>
          <CopyToClipboard
            text={this.state.refLink}
            onCopy={() => this.setState({ copied: true })}
          >
            <ActionButton>Copy to clipboard</ActionButton>
          </CopyToClipboard>
          <ActionButton>Share on Twitter</ActionButton>
          <ActionButton>Share on Facebook</ActionButton>
        </ActionsButtons>
        <HeaderText>how it works</HeaderText>
        <MainText>
          Share your referral code with anyone you like!<br />
          For every person that uses your link to sign up,<br />
          DRIP will give you each 500 DRIPX for free!*
        </MainText>
        <AdditionalInfo textAlign={`left`}>
          DRIPX is the DRIP FOUNDATION’s utility coin. It can be used to pay<br />
          transaction fees here on DRIP and be traded on participating
          exchanges.<br />
          For security reasons, customers may acquire a maximum of USD $1,000<br />
          worth of PPX per day through combination of buy-ins and referrals.
          DRIPX<br />
          referral rewards are given out only after the referred friend becomes{" "}
          <br />
          “active.” By making referrals, you agree to all{" "}
          <ExternalLink>terms of service</ExternalLink>
        </AdditionalInfo>
      </Body>
    );
  }
}

ReferFriend.propTypes = {};

const mapStateToProps = () => {
  return {};
};

const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(ReferFriend);

const Body = styled.div`
  padding: 0 17px;
`;

const ActionsButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

const ActionButton = styled.div`
  height: 14px;
  font-family: Helvetica, sans-serif;
  font-size: 10px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #229ae8;
  border: none;
  background: none;
  margin-right: 16px;
`;

const HeaderText = styled.p`
  font-family: Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.6px;
  color: #66688f;
  text-transform: uppercase;
  margin-top: 45px;
`;

const MainText = styled.p`
  margin-top: 11px;
  font-family: Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.31;
  letter-spacing: normal;
  color: #ffffff;
`;

const ExternalLink = styled.a`
  text-decoration: none;
  color: #229ae8;
`;
