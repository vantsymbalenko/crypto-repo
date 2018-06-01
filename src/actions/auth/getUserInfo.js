import {FIREBASE_COLLECTION_USER} from "../../constants/appConst";
import {firebaseFirestore} from "../../FirebaseConfig/Fire";
import {signInSuccess} from "./signInSuccess";
import { toggleErrorModal } from "../modals/errorModal";

export const getUserInfo = (uid, status) => {
    return dispatch =>
        firebaseFirestore
        .collection(FIREBASE_COLLECTION_USER)
        .doc(uid)
        .get()
        .then((response) => {
            const data = response.data();
            if(data.secret){
                dispatch(signInSuccess(data));
            }return data;
        })
        .catch((err) => {
          const error = {
            errorCode: err.code,
            errorMessage: err.message
          };
          dispatch(toggleErrorModal(error));
        });
};