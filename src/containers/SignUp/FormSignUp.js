import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  emailRule,
  firstNameRule,
  lastNameRule,
  passwordRule
} from "../../validationRules/rules";
import Validation from "react-validation-utils";
import { toggleSignUpSuccessModal } from "../../actions/modals/signUpModals";

/*** components ***/
import { Input } from "../../components/Input";
import { Modal } from "../../components/Modals/Modal";
import { CountriesSelect } from "../../components/CountriesSelect/CountriesSelect";

/*** ***/
import { registerNewUser } from "../../actions/registerNewUser";
import { getFlagUrl } from "../../helpers/getFlagUrl";
import getBorderColor from "../../helpers/getBorderColor";
import { PRESIGN_IN } from "../../constants/authConst";

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
      isShowModal: false
    });
    this.getBorderColor = getBorderColor.bind(this);
  }

  onChange = e => {
    const { name, value } = e.target;
    if (name === "password") {
      Validator.updateRules({
        rePassword: {
          repeatRule: val => val === value
        }
      }).fieldsToValidate(["password", "rePassword"]);
    } else if (name === "rePassword") {
      Validator.updateRules({
        password: {
          repeatRule: val => val === value
        }
      }).fieldsToValidate(["password", "rePassword"]);
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
    // this.props.toggleSignUpSuccessModal();
    this.props.registerNewUser(this.state);
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
            onChange={this.onChange}
            name={"mobileCode"}
            dialCode={this.state.mobileCode}
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
            value={firstName}
            name={`firstName`}
            borderColor={this.getBorderColor("firstName")}
            labelText={"First Name*"}
            placeholder={"first name"}
            marginRight={`30px`}
            onChange={this.onChange}
          />
          <Input
            value={lastName}
            name={`lastName`}
            borderColor={this.getBorderColor("lastName")}
            placeholder={"last name"}
            labelText={"Last Name*"}
            onChange={this.onChange}
          />
        </TwoInputRows>
        <TwoInputRows>
          <Input
            value={email}
            name={`email`}
            type={"email"}
            placeholder={"enter email address"}
            labelText={"Email Address*"}
            onChange={this.onChange}
            borderColor={this.getBorderColor("email")}
          />
        </TwoInputRows>
        <TwoInputRows>
          <Input
            value={mobile}
            type={"tel"}
            name={`mobile`}
            labelText={"Mobile Number*"}
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
            value={telegramID}
            name={`telegramID`}
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
              labelMargin={"0"}
              type={"password"}
              value={password}
              name={`password`}
              borderColor={this.getBorderColor("password")}
              placeholder={"password"}
              marginRight={`30px`}
              onChange={this.onChange}
            />
            <Input
              labelMargin={"0"}
              type={"password"}
              borderColor={this.getBorderColor("confirmPassword")}
              value={confirmPassword}
              name={`confirmPassword`}
              placeholder={"password confirm"}
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
          onClick={this.onSubmit}
          disabled={this.props.authStatus === PRESIGN_IN}
        >
          Sign Up Now
        </Button>
      </Form>
    );
  }
}

FormSignUp.propTypes = {
  toggle: PropTypes.bool
};

const mapStateToProps = state => ({
  authStatus: state.authData.authStatus
});

const mapStateToDispatch = {
  registerNewUser,
  toggleSignUpSuccessModal
};

export default connect(mapStateToProps, mapStateToDispatch)(FormSignUp);

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
