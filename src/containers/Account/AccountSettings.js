import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Validation from "react-validation-utils";

/*** components ***/
import { Input } from "../../components/Input";

/*** actions ***/
import { saveChanges } from "../../actions/auth/saveChangesInProfile";

/*** else ***/
import { REQ } from "../../constants/authConst";
import { EXTERNAL_LINK_HELP_LOGIN_PAGE } from "../../constants/appConst";
import { fire } from "../../FirebaseConfig/Fire";
import { getFlagUrl } from "../../helpers/getFlagUrl";
import getBorderColor from "../../helpers/getBorderColor";
import {
  emailRule,
  firstNameRule,
  lastNameRule,
  mobileRule
} from "../../validationRules/rules";
import profileFotoImgSrc from "../../images/foto.png";

const Validator = new Validation({
  email: {
    rule: emailRule,
    message: "Email is incorrect"
  },
  firstName: {
    rule: firstNameRule,
    message: "Name can't contain numbers"
  },
  lastName: {
    rule: lastNameRule,
    message: "Name is incorrect"
  },
  mobile: {
    rule: mobileRule,
    message:
      "Phone number can contain only digits without letters and special characters"
  }
});

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = Validator.addValidation({
      refCode: "",
      lastName: this.props.usersData.lastName,
      email: fire.auth().currentUser.email,
      firstName: this.props.usersData.firstName,
      mobile: this.props.usersData.mobile,
      mobileCode: this.props.usersData.mobileCode,
      countryCode: this.props.usersData.countryCode,
      telegramID: this.props.usersData.telegramID,
      file: "",
      isShowModal: false,
      googleCode: "",
      src: this.props.usersData.imgSrc || profileFotoImgSrc
    });
    this.getBorderColor = getBorderColor.bind(this);
  }

  onChange = e => {
    const { name, value } = e.target;
    if (name === "mobileCode") {
      this.setState({
        countryCode: e.target.dataset.countryCode
      });
    }

    this.setState(Validator.validate({ [name]: value }));
  };

  previewImage = () => {
    const oFReader = new FileReader();
    if (this.file.files && this.file.files[0]) {
      console.log("worl");
      oFReader.onload = e => {
        this.setState({
          src: e.target.result
        });
      };
      oFReader.readAsDataURL(this.file.files[0]);
    }
  };

  toggleModal = () => {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  };

  submit = e => {
    e.preventDefault();
    if (!Validator.isFormValid(this.state)) {
      // validate all fields in the state to show all error messages
      return this.setState(Validator.validate());
    }
    const sendData = {
      refCode: this.state.refCode,
      lastName: this.state.lastName,
      email: fire.auth().currentUser.email,
      firstName: this.state.firstName,
      mobile: this.state.mobile,
      mobileCode: this.state.mobileCode,
      countryCode: this.state.countryCode,
      telegramID: this.state.telegramID,
      googleCode: this.state.googleCode
    };
    this.props.saveChanges(sendData, this.file.files[0]);
  };

  render() {
    return (
      <AccountBody>
        <ImageGroup>
          <ProfileImage src={this.state.src} />
          <LabelInputFile>
            <InputFile
              type={`file`}
              innerRef={node => (this.file = node)}
              onChange={this.previewImage}
            />
            Choose from gallery
          </LabelInputFile>
        </ImageGroup>
        <TwoInputRows>
          <Input
            onChange={this.onChange}
            value={this.state.firstName}
            placeholder={`first name`}
            borderColor={this.getBorderColor(`firstName`)}
            name={`firstName`}
            marginRight={`17px`}
            labelText={"First Name"}
          />
          <Input
            onChange={this.onChange}
            value={this.state.lastName}
            borderColor={this.getBorderColor(`lastName`)}
            placeholder={`last name`}
            name={"lastName"}
            labelText={"Last Name"}
          />
        </TwoInputRows>
        <Input
          onChange={this.onChange}
          value={this.state.email}
          name={`email`}
          borderColor={this.getBorderColor(`email`)}
          placeholder={`email`}
          labelText={`Email`}
          marginTop={`31px`}
        />
        <TwoInputRows>
          <Input
            value={this.state.mobile}
            type={"text"}
            name={`mobile`}
            labelText={"Mobile Number"}
            borderColor={this.getBorderColor(`mobile`)}
            marginRight={`30px`}
            placeholder={""}
            onChange={this.onChange}
          >
            <ImgFlag
              src={getFlagUrl(this.state.countryCode)}
              onClick={this.toggleModal}
            />
            <DialCode>{this.state.mobileCode}</DialCode>
          </Input>
          <Input
            value={this.state.telegramID}
            name={`telegramID`}
            labelText={"Telegram ID"}
            placeholder={"telegram ID"}
            onChange={this.onChange}
          />
        </TwoInputRows>
        <RowWithHeader>
          <LabelTitlte>
            <CapitalizeText>Google authenticator code</CapitalizeText>
            <AdditionalText> (required for all account updates)</AdditionalText>
          </LabelTitlte>
          <Input
            onChange={this.onChange}
            value={this.state.googleCode}
            name={`googleCode`}
            placeholder={`****`}
            labelMargin={`0`}
            type={"password"}
            rowReverse
          >
            <HelpExternalLink href={`${EXTERNAL_LINK_HELP_LOGIN_PAGE}`}>
              Help
            </HelpExternalLink>
          </Input>
        </RowWithHeader>
        <ButtonShowModal type={`button`}>Reset my Password</ButtonShowModal>
        <BottomContent>
          <AdditionalText>
            {" "}
            Want to delete your account? Please contact
            support@dripfoundation.io
          </AdditionalText>
          <Button
            type={`submit`}
            onClick={this.submit}
            disabled={this.props.reqStatus === REQ}
          >
            Save settings
          </Button>
        </BottomContent>
      </AccountBody>
    );
  }
}

AccountSettings.propTypes = {
  usersData: PropTypes.object
};

const mapStateToProps = state => {
  return {
    usersData: state.authData.usersData,
    reqStatus: state.appData.reqStatus
  };
};

const mapStateToDispatch = {
  saveChanges
};

export default connect(mapStateToProps, mapStateToDispatch)(AccountSettings);

const AccountBody = styled.form`
  padding: 0 17px;
`;

const ImageGroup = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileImage = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  margin-right: 17px;
`;
const LabelInputFile = styled.label`
  width: 198px;
  height: 45px;
  border: solid 0.3px #66688f;
  font-family: Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.6px;
  color: #66688f;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;
const InputFile = styled.input`
  display: none;
`;
const TwoInputRows = styled.div`
  display: flex;
  margin-top: 15px;
`;

const ImgFlag = styled.img`
  width: 24px;
  height: 24px;
  &:hover {
    cursor: pointer;
  }
`;
const DialCode = styled.span`
  font-family: "Helvetica", sans-serif;
  font-size: 16px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #ffffff;
  white-space: nowrap;
`;

const LabelTitlte = styled.div`
  font-family: Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.6px;
  color: #66688f;
`;
const CapitalizeText = styled.span`
  text-transform: uppercase;
  font-family: Helvetica, sans-serif;
  font-size: 11px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.6px;
  color: #66688f;
`;
const AdditionalText = styled.span`
  font-family: Helvetica, sans-serif;
  font-size: 9px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.22;
  letter-spacing: normal;
  color: #66688f;
  white-space: nowrap;
`;
const RowWithHeader = styled.div`
  margin-top: 37px;
`;

const styleForExternalLink = () => css`
  text-decoration: none;
  white-space: nowrap;
  font-family: Helvetica, sans-serif;
  font-size: 10px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #229ae8;
  &:hover {
    text-decoration: underline;
  }
`;
const ButtonShowModal = styled.button`
  ${styleForExternalLink()};
  background: none;
  border: none;
  display: block;
  margin: 28px auto;
`;
const HelpExternalLink = styled.a`
  ${styleForExternalLink()};
`;

const BottomContent = styled.div`
  height: 135px;
  //border: 1px solid white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  max-width: 343px;
  height: 45px;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  font-family: Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: 0.8px;
  color: #ffffff;
  background-image: linear-gradient(to bottom, #4eace0, #2a64b4);
  margin: 12px auto;
  transition: 400ms easy;
  &:hover {
    cursor: pointer;
    background-image: linear-gradient(to top, #4eace0, #2a64b4);
  }
  &[disabled] {
    background: #1f1f2f;
  }
`;
