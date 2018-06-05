import { REQUEST_END } from "../../constants/authConst";
import {fire, firebaseFirestore} from "../../FirebaseConfig/Fire";
import { getUserInfo } from "./getUserInfo";
import { signInSuccess } from "./signInSuccess";
import {FIREBASE_COLLECTION_USER} from "../../constants/appConst";
import {toggleErrorModal} from "../modals/errorModal";

export const reqStatus = () => ({
  type: REQUEST_END
});

export const getUserStatus = () => {
  return dispatch => {
    fire.auth().onAuthStateChanged(async user => {
      if (user) {
        try{
            const userInfoFromFireStore = await firebaseFirestore.collection(FIREBASE_COLLECTION_USER).doc(user.uid).get(),
                  userDataFromFireStore = await userInfoFromFireStore.data();
            dispatch(signInSuccess(userDataFromFireStore));
            dispatch(reqStatus());
        }catch(err){
          console.log("Error ", err.message);
          dispatch(reqStatus());
        }

        // dispatch(getUserInfo(user.uid)).then((response) => {
        //   dispatch(signInSuccess(response));
        //   dispatch(reqStatus());
        // });
      } else {
        dispatch(reqStatus());
      }
    });
  };
};
