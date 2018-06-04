import { REQUEST_END } from "../../constants/authConst";
import { fire } from "../../FirebaseConfig/Fire";
import { getUserInfo } from "./getUserInfo";
import { signInSuccess } from "./signInSuccess";

export const reqStatus = () => ({
  type: REQUEST_END
});

export const getUserStatus = () => {
  return dispatch => {
    return fire.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(getUserInfo(user.uid)).then((response) => {
          // dispatch(signInSuccess(response));
          dispatch(reqStatus());
        });
      } else {
        dispatch(reqStatus());
      }
    });
  };
};
