import {EMAIL_NOT_VERIFIED_MESSAGE} from "../../../constants/authConst";
import { fire } from "../../../FirebaseConfig/Fire";
import { toggleErrorModal } from "../../modals/errorModal";
import { getUserInfo } from "../getUserInfo";
import { signInSuccess } from "../signInSuccess";
import { verifyGoogleCode } from "../googleApi/verifyGoogleCode";
import { showGoogleAuthenticationSetup } from "./showGoogleAuthenticationSetup";
import {setSecretCode} from "./setSecretCode";
import { disableButtons, enableButtons } from "../requestStatus";

export const signIn = async (email, password, code) => {
  return (dispatch, getState) => {

      const state = getState();
      let   secret = state.authData.secret;

    /*** disable sign in button ***/
    dispatch(disableButtons());

    return fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {

        /*** if is user and user have verified email  => get user data***/
        if (response.user && response.user.emailVerified) {
          console.log("eemail was verified");
          const uid = response.user.uid;
          // dispatch(getUserInfo(uid))
          dispatch(getUserInfo(uid))
            .then(userData => {
            console.log("get user data ", userData);
            console.log("state", getState());
            /*** if there is secret in redux store or in firestore
             * then make code verification
             * ***/
            secret = userData.secret || secret;
            console.log("secret", secret);
            if (response && secret) {
              console.log("before verify", getState());
              verifyGoogleCode(secret, code).then(response => {
                console.log("verify", response, getState());
                if (response.status === 200) {
                  setSecretCode({secret: secret})
                    .then(() => {
                      dispatch(signInSuccess(userData));
                      dispatch(enableButtons());
                    });
                } else {
                  console.log("enables buttons", response.status, getState());
                  dispatch(enableButtons());
                }
              });
            } else {
              console.log("show google setup");
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
          dispatch(enableButtons());
        }
      })
      .catch(err => {
        const error = {
          errorCode: err.code,
          errorMessage: err.message
        };

        dispatch(toggleErrorModal(error));
        /*** enable sign in button ***/
        dispatch(enableButtons());
      });
  };
};
