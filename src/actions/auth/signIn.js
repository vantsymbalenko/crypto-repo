import {EMAIL_NOT_VERIFIED_MESSAGE, REQ} from "../../constants/authConst";
import { fire } from "../../FirebaseConfig/Fire";
import { toggleErrorModal } from "../modals/errorModal";
import { preSignInStatus } from "./preSignInStatus";
import { enableButton } from "../enableButton";
import { getUserInfo } from "./getUserInfo";
import { signInSuccess } from "./signInSuccess";
import { verifyGoogleCode } from "./verifyGoogleCode";
import { showGoogleAuthenticationSetup } from "./showGoogleAuthenticationSetup";
import {setSecretCode} from "./setSecretCode";
import {reqStatus} from "./getUserStatus";

export const signIn = (email, password, code) => {
  return (dispatch, getState) => {
    /*** disable sign in button ***/
    dispatch(preSignInStatus());

    return fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        if (response.user && response.user.emailVerified) {
          const uid = fire.auth().currentUser.uid;
          console.log("uisssddddd", uid);
          dispatch(getUserInfo(uid)).then(response => {
              console.log("response", response);
            const state = getState(),
              secret = state.authData.secret;
            if (response && secret) {
              verifyGoogleCode(secret, code).then(response => {
                console.log("verify", response);
                if (response.status === 200) {
                  setSecretCode({secret: secret})
                    .then(() => {
                        dispatch(getUserInfo(uid))
                          .then((response) => dispatch(signInSuccess(response)))
                            .then(() => dispatch(reqStatus()))
                    });

                } else {
                  dispatch(enableButton());
                }
              });
            } else {
              dispatch(showGoogleAuthenticationSetup());
            }
          });
        } else {
          const error = {
            errorCode: "400",
            errorMessage: EMAIL_NOT_VERIFIED_MESSAGE
          };
          dispatch(toggleErrorModal(error));
          /*** enable sign in button ***/
          dispatch(enableButton());
        }
      })
      .catch(err => {
        const error = {
          errorCode: err.code,
          errorMessage: err.message
        };

        dispatch(toggleErrorModal(error));
        /*** enable sign in button ***/
        dispatch(enableButton());
      });
  };
};
