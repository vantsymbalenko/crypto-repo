import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Validation from "react-validation-utils";

/*** components ***/
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modals/Modal";
import { CountriesSelect } from "../../components/CountriesSelect/CountriesSelect";

/*** actions ***/
import { registerNewUser } from "../../actions/registerNewUser";
import { toggleSignUpSuccessModal } from "../../actions/modals/signUpModals";
import { REQ } from "../../constants/authConst";

/*** else ***/
import { getUrlParams } from "../../helpers/getUrlParams";
import getBorderColor from "../../helpers/getBorderColor";
import { getFlagUrl } from "../../helpers/getFlagUrl";
import {
  emailRule,
  firstNameRule,
  lastNameRule,
  passwordRule,
  mobileRule
} from "../../validationRules/rules";

const Validator = new Validation({
  email: {
    rule: emailRule,
    message: "Email is incorrect"
  },
  password: {
    rule: passwordRule,
    message: "Password is incorrect",
    id: "repeatRule"
  },
  confirmPassword: {
    rule: passwordRule,
    message: "Those passwords didn't match. Try again.",
    id: "repeatRule"
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
      "Phone number must contain only digits without letters and special characters"
  }
});

class FormSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = Validator.addValidation({
      refCode: "",
      lastName: "",
      email: "",
      firstName: "",
      mobile: "",
      mobileCode: "+1",
      countryCode: "US",
      telegramID: "",
      password: "",
      confirmPassword: "",
      isShowModal: false,
      ...getUrlParams(this.props.location)
    });

    this.getBorderColor = getBorderColor.bind(this);
  }

  onChange = e => {
    const { name, value } = e.target;
    if (name === "password") {
      Validator.updateRules({
        confirmPassword: {
          repeatRule: val => val === value
        }
      }).fieldsToValidate(["password", "confirmPassword"]);
    } else if (name === "confirmPassword") {
      Validator.updateRules({
        password: {
          repeatRule: val => val === value
        }
      }).fieldsToValidate(["password", "confirmPassword"]);
    }

    if (name === "mobileCode") {
      this.setState({
        countryCode: e.target.dataset.countryCode
      });
    }

    this.setState(Validator.validate({ [name]: value }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (!Validator.isFormValid(this.state)) {
      // validate all fields in the state to show all error messages
      return this.setState(Validator.validate());
    }
    this.props.registerNewUser({
      email: this.state.email,
      password: this.state.password,
      refCode: this.state.refCode,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      mobile: this.state.mobile,
      mobileCode: this.state.mobileCode,
      countryCode: this.state.countryCode,
      telegramID: this.state.telegramID
    });
  };

  toggleModal = () => {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  };

  render() {
    const {
      refCode,
      firstName,
      lastName,
      email,
      mobile,
      telegramID,
      password,
      confirmPassword
    } = this.state;
    return (
      <Form toggle={this.props.toggle}>
        <Modal display={this.state.isShowModal} onClose={this.toggleModal}>
          <CountriesSelect
            name={"mobileCode"}
            dialCode={this.state.mobileCode}
            onChange={this.onChange}
            closeModal={this.toggleModal}
          />
        </Modal>
        <Input
          name={`refCode`}
          value={refCode}
          labelText={"Referral Code"}
          placeholder={"enter referral code"}
          onChange={this.onChange}
        />
        <TwoInputRows>
          <Input
            name={`firstName`}
            value={firstName}
            labelText={"First Name*"}
            placeholder={"first name"}
            marginRight={`30px`}
            borderColor={this.getBorderColor("firstName")}
            onChange={this.onChange}
          />
          <Input
            name={`lastName`}
            value={lastName}
            labelText={"Last Name*"}
            placeholder={"last name"}
            borderColor={this.getBorderColor("lastName")}
            onChange={this.onChange}
          />
        </TwoInputRows>
        <TwoInputRows>
          <Input
            type={"email"}
            name={`email`}
            value={email}
            labelText={"Email Address*"}
            placeholder={"enter email address"}
            borderColor={this.getBorderColor("email")}
            onChange={this.onChange}
          />
        </TwoInputRows>
        <TwoInputRows>
          <Input
            type={"tel"}
            name={`mobile`}
            value={mobile}
            labelText={"Mobile Number*"}
            placeholder={""}
            marginRight={`30px`}
            borderColor={this.getBorderColor(`mobile`)}
            onChange={this.onChange}
          >
            <ImgFlag
              src={getFlagUrl(this.state.countryCode)}
              onClick={this.toggleModal}
            />
            <DialCode>{this.state.mobileCode}</DialCode>
          </Input>
          <Input
            name={`telegramID`}
            value={telegramID}
            labelText={"Telegram ID"}
            placeholder={"telegram ID"}
            onChange={this.onChange}
          />
        </TwoInputRows>
        <RowWithHeader>
          <LabelTitlte>
            <CapitalizeText>Password*</CapitalizeText>
            <AdditionalText>
              {" "}
              (Min. 8 characters with at least one letter and one number)
            </AdditionalText>
          </LabelTitlte>
          <TwoInputRows marginTop={"0"}>
            <Input
              type={"password"}
              name={`password`}
              value={password}
              labelMargin={"0"}
              placeholder={"password"}
              marginRight={`30px`}
              borderColor={this.getBorderColor("password")}
              onChange={this.onChange}
            />
            <Input
              type={"password"}
              name={`confirmPassword`}
              value={confirmPassword}
              labelMargin={"0"}
              placeholder={"password confirm"}
              borderColor={this.getBorderColor("confirmPassword")}
              onChange={this.onChange}
            />
          </TwoInputRows>
        </RowWithHeader>
        <RulesText>
          <Paragraph>
            By signing up, you agree to all
            <LinkText> terms of service</LinkText>
          </Paragraph>
          <Paragraph>
            Already have an account?
            <Link to={`/login`}>
              <Span> Log in</Span>
            </Link>
          </Paragraph>
        </RulesText>
        <Button
          type={"submit"}
          disabled={this.props.authStatus === REQ}
          onClick={this.onSubmit}
        >
          Sign Up Now
        </Button>
      </Form>
    );
  }
}

FormSignUp.propTypes = {
  toggle: PropTypes.bool,
  authStatus: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  authStatus: state.appData.reqStatus
});

const mapStateToDispatch = {
  registerNewUser,
  toggleSignUpSuccessModal
};

export default withRouter(
  connect(mapStateToProps, mapStateToDispatch)(FormSignUp)
);

const Form = styled.form`
  padding: 17px;
  transition: all 0.3s ease-in-out;
  margin-left: ${props => (props.toggle ? "0" : "-100vw")};
`;
const TwoInputRows = styled.div`
  display: flex;
  margin-top: ${props => props.marginTop || "11px"};
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
`;
const RowWithHeader = styled.div`
  margin-top: 37px;
`;
const RulesText = styled.div`
  text-align: center;
  margin-top: 33px;
  font-family: Helvetica, sans-serif;
  font-size: 10px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: normal;
`;

const Paragraph = styled.div`
  color: #66688f;
  padding-left: 10px;
  font-family: Helvetica, sans-serif;
  font-size: 10px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: normal;
`;

const LinkText = styled.a`
  text-decoration: none;
  color: #229ae8;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Span = styled.span`
  text-decoration: none;
  color: #229ae8;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
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
