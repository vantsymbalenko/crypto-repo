import {
  EMAIL_NOT_VERIFIED_MESSAGE,
  GET_USER_INFO
} from "../constants/authConst";
import { fire, firebaseFirestore } from "../FirebaseConfig/Fire";
import { FIREBASE_COLLECTION_USER } from "../constants/appConst";
import {toggleErrorModal} from "./modals/errorModal";
import { preSignInStatus } from "./preSignInStatus";
import { enableButton } from "./enableButton";

const signInSuccess = data => ({
  type: GET_USER_INFO,
  payload: data
});

export const getUserInfo = (email, password) => {
  return dispatch => {
    /*** disable sign in button ***/
    dispatch(preSignInStatus());

    return fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        if (response.user && response.user.emailVerified) {
          const uid = fire.auth().currentUser.uid;
          firebaseFirestore
            .collection(FIREBASE_COLLECTION_USER)
            .doc(uid)
            .get()
            .then(response => {
              dispatch(signInSuccess(response.data()));
            });
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
