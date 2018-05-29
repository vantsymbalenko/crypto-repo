import {
  EMAIL_NOT_VERIFIED_MESSAGE,
} from "../../constants/authConst";
import { fire } from "../../FirebaseConfig/Fire";
import {toggleErrorModal} from "../modals/errorModal";
import { preSignInStatus } from "./preSignInStatus";
import { enableButton } from "../enableButton";
import {getUserInfo} from "./getUserInfo";


export const signIn = (email, password) => {
    console.log("arguments", arguments);
  return dispatch => {
    /*** disable sign in button ***/
    dispatch(preSignInStatus());

    return fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        if (response.user && response.user.emailVerified) {
          const uid = fire.auth().currentUser.uid;
          dispatch(getUserInfo(uid));
        } else {
          dispatch(
            toggleErrorModal({
              errorCode: "400",
              errorMessage: EMAIL_NOT_VERIFIED_MESSAGE
            })
          );

          /*** enable login button ***/
          dispatch(enableButton());
        }
      })
      .catch(err => {
        dispatch(
          toggleErrorModal({
            errorCode: err.code,
            errorMessage: err.message
          })
        );
        dispatch(enableButton());
      });
  };
};
