import {FIREBASE_COLLECTION_USER} from "../../constants/appConst";
import {firebaseFirestore, firestoreDB} from "../../FirebaseConfig/Fire";
import {signInSuccess} from "./signInSuccess";

export const getUserInfo = (uid) => {
    return dispatch =>
        firebaseFirestore
        .collection(FIREBASE_COLLECTION_USER)
        .doc(uid)
        .get()
        .then((response) => {
            const data = response.data();
            if(data.secret && data.firstLogin){
                dispatch(signInSuccess(response.data()));
            }
            return response.data();
        })
        .catch((err) => {
            console.log("err",err);
        })
};