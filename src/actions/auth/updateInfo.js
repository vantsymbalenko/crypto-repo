import {preSignInStatus} from "./preSignInStatus";
import {fire, firebaseFirestore} from "../../FirebaseConfig/Fire";
import {FIREBASE_COLLECTION_USER} from "../../constants/appConst";
import {signInSuccess} from "./signInSuccess";
import {toggleErrorModal} from "../modals/errorModal";

export const updateInfo = (data) => {
  return dispatch => {
      dispatch(preSignInStatus());
      const uid = fire.auth().currentUser.uid;

      return  firebaseFirestore
          .collection(FIREBASE_COLLECTION_USER)
          .doc(uid)
          .update(data)
          .then(() => {
              dispatch(signInSuccess());
          })
          .catch((err) => {
              dispatch(toggleErrorModal({
                  errCode: err.code,
                  errMessage: err.message
              }));
              console.log("err",err);
          })
  }
};