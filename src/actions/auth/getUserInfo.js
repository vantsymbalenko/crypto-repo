import {FIREBASE_COLLECTION_USER} from "../../constants/appConst";
import {firebaseFirestore} from "../../FirebaseConfig/Fire";
import { toggleErrorModal } from "../modals/errorModal";

export const getUserInfo = (uid) => {
    return dispatch =>
      firebaseFirestore
        .collection(FIREBASE_COLLECTION_USER)
        .doc(uid)
        .get()
        .then((response) => {
            return response.data();
        })
        .catch((err) => {
          const error = {
            errorCode: err.code,
            errorMessage: err.message
          };
          dispatch(toggleErrorModal(error));
        });
};