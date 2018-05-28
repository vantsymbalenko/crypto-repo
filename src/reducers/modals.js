import { ERROR_MODAL } from "../constants/authConst";
import { LOGIN_RESET_PASSWORD_MODAL, SIGN_UP_SUCCESS_MODAL, SUCCESS_RESET_PASSWORD_MODAL } from "../constants/modals";

const initialState = {
  errorModal: {
    isShowErrorModal: false,
    errorCode: "",
    errorMessage: ""
  },
  signUpModal: {
    isShowSignUpSuccessModal: false
  },
  loginModal: {
    isShowLoginResetPasswordModal: false,
    isShowLoginSuccessResetPasswordModal: false
  }
};
export const modals = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_MODAL: {
      return {
        ...state,
        errorModal: {
          isShowErrorModal: !state.errorModal.isShowErrorModal,
          ...action.payload
        }
      };
    }
    case SIGN_UP_SUCCESS_MODAL: {
      return{
        ...state,
        signUpModal: {
          isShowSignUpSuccessModal: !state.signUpModal.isShowSignUpSuccessModal
        }
      };
    }
    case LOGIN_RESET_PASSWORD_MODAL: {
      return{
        ...state,
        loginModal: {
          ...state.loginModal,
          isShowLoginResetPasswordModal: !state.loginModal.isShowLoginResetPasswordModal
        }
      };
    }
    case SUCCESS_RESET_PASSWORD_MODAL: {
      return{
        ...state,
        loginModal: {
          ...state.loginModal,
          isShowLoginSuccessResetPasswordModal: !state.loginModal.isShowLoginSuccessResetPasswordModal
        }
      };
    }
    default: {
      return state;
    }
  }
};
