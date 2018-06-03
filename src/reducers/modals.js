import { ERROR_MODAL } from "../constants/authConst";
import { LOGIN_RESET_PASSWORD_MODAL, SIGN_UP_SUCCESS_MODAL, SUCCESS_RESET_PASSWORD_MODAL, MENU } from "../constants/modals";

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
  },
  isShowMenuModal: false
};
export const modals = (state = initialState, action) => {
  switch (action.type) {
    case ERROR_MODAL: {
      return {
        ...state,
        errorModal: {
          isShowErrorModal: !state.errorModal.isShowErrorModal,
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage
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
    case MENU: {
      return{
        ...state,
        isShowMenuModal: !state.isShowMenuModal
      }
    }
    default: {
      return state;
    }
  }
};
