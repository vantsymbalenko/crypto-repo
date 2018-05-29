import { FIREBASE_COLLECTION_USER } from "../constants/appConst";
import { fire, firebaseFirestore } from "../FirebaseConfig/Fire";
import { preSignInStatus } from "./auth/preSignInStatus";
import { enableButton } from "./enableButton";
import {toggleErrorModal} from "./modals/errorModal";
import { toggleSignUpSuccessModal } from "./modals/signUpModals";

export const registerNewUser = (data) => {
  const { email, password, validationStorage, ...rest } = data;
  return dispatch => {
    /*** disable button ***/
    dispatch(preSignInStatus());

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const { uid } = response.user;
        firebaseFirestore
          .collection(FIREBASE_COLLECTION_USER)
          .doc(uid)
          .set({
            ...rest
          })
          .then(() => {
            fire
              .auth()
              .currentUser.sendEmailVerification()
              .then(() => {
                dispatch(toggleSignUpSuccessModal());
                dispatch(enableButton());
              });
          })
          .catch(err => {
            console.log("error", err);
            dispatch(
              toggleErrorModal({
                errorCode: err.code,
                errorMessage: err.message
              })
            );
            dispatch(enableButton());
          });
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
