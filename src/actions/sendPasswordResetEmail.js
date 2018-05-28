import { fire } from "../FirebaseConfig/Fire";
import { preSignInStatus } from "./preSignInStatus";
import { enableButton } from "./enableButton";
import { toggleSuccessResetPasswordModal } from "./modals/loginModals";
import { toggleErrorModal } from "./modals/errorModal";

export const sendPasswordResetEmail = email => {
  return dispatch => {
    /***disable buttton ***/
    dispatch(preSignInStatus());

    return fire
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch(toggleSuccessResetPasswordModal());

        /*** enable button ***/
        dispatch(enableButton());
      })
      .catch(err => {
        dispatch(
          toggleErrorModal({
            errorCode: err.code,
            errMessage: err.message
          })
        );
        dispatch(enableButton());
      });
  };
};
