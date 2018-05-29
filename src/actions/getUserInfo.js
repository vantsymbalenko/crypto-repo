import {FIREBASE_COLLECTION_USER} from "../constants/appConst";
import {firebaseFirestore} from "../FirebaseConfig/Fire";
import {signInSuccess} from "./signInSuccess";

export const getUserInfo = (uid) => {
    return dispatch =>
        firebaseFirestore
        .collection(FIREBASE_COLLECTION_USER)
        .doc(uid)
        .get()
        .then((response) => {
            dispatch(signInSuccess(response.data()));
        })
        .catch((err) => {
            console.log("err",err);
        })
};