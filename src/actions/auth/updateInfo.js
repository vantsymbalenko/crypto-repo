import {fire, firebaseFirestore} from "../../FirebaseConfig/Fire";
import {FIREBASE_COLLECTION_USER} from "../../constants/appConst";
import {toggleErrorModal} from "../modals/errorModal";

export const updateInfo = (data) => {
  return dispatch => {
      const uid = fire.auth().currentUser.uid;

      return  firebaseFirestore
          .collection(FIREBASE_COLLECTION_USER)
          .doc(uid)
          .update(data)
          .catch((err) => {
              dispatch(toggleErrorModal({
                  errCode: err.code,
                  errMessage: err.message
              }));
          });
  }
};