import {REQ, REQUEST_END} from "../../constants/authConst";
import { fire, firebaseFirestore } from "../../FirebaseConfig/Fire";
import { FIREBASE_COLLECTION_USER } from "../../constants/appConst";

/*** requests ***/
import { signInSuccess } from "./signInSuccess";

export const reqStatus = () => ({
  type: REQUEST_END
});

export const getUserStatus = () => {
  return async (dispatch, getState) => {
    /*** onAuthStateChanged observer from firebase, call everytime when user made some action (see doc)***/
    fire.auth().onAuthStateChanged(async user => {
      const req = getState().appData.reqStatus;
        /***
         * if user was get and if not request status( can be when user clicked login button ) then auto login user
         * this function must work only when user refresh page
         */
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
