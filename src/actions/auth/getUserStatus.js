import {REQ} from "../../constants/authConst";
import {fire} from "../../FirebaseConfig/Fire";
import {getUserInfo} from "./getUserInfo";

const reqStatus = () => ({
  type: REQ
});

export const getUserStatus = () => {
  return dispatch => {
    return fire.auth().onAuthStateChanged((user) => {
      if(user){
        dispatch(getUserInfo(user.uid));
        dispatch(reqStatus());
      }else{
        dispatch(reqStatus());
      }
    })
  }
};