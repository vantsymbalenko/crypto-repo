import { LOGIN_RESET_PASSWORD_MODAL, SUCCESS_RESET_PASSWORD_MODAL } from "../../constants/modals";

export const toggleResetPasswordModal = () => {
  return {
    type: LOGIN_RESET_PASSWORD_MODAL
  }
};

export const toggleSuccessResetPasswordModal = () => {
  return {
    type: SUCCESS_RESET_PASSWORD_MODAL
  }
};