import {REQ, REQUEST_END} from "../../constants/authConst";
import { fire, firebaseFirestore } from "../../FirebaseConfig/Fire";
import { signInSuccess } from "./signInSuccess";
import { FIREBASE_COLLECTION_USER } from "../../constants/appConst";

export const reqStatus = () => ({
  type: REQUEST_END
});

export const getUserStatus = () => {
  return async (dispatch, getState) => {
    fire.auth().onAuthStateChanged(async user => {
      const req = getState().appData.reqStatus;
      if (user && req!==REQ) {
        try{
            const userInfoFromFireStore = await firebaseFirestore.collection(FIREBASE_COLLECTION_USER).doc(user.uid).get(),
                  userDataFromFireStore = await userInfoFromFireStore.data();
            dispatch(signInSuccess(userDataFromFireStore));
            dispatch(reqStatus());
        }catch(err){
          console.log("Error ", err.message);
          dispatch(reqStatus());
        }
      } else {
        dispatch(reqStatus());
      }
    });
  };
};
