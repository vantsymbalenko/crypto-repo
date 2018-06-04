import {fire} from "../../../FirebaseConfig/Fire";
import {toggleErrorModal} from "../../modals/errorModal";
import {toggleMenu} from "../../modals/toggleMenu";
import {LOGOUT} from "../../../constants/authConst";

export const signOut = () => {
    return dispatch => {
        return fire.auth().signOut()
            .then((response) => {
              console.log("response log out", response);

                dispatch({
                    type: LOGOUT
                });
                dispatch(toggleMenu());
            })
            .catch((err) => {
                dispatch(toggleErrorModal({
                    errorCode: err.code,
                    errorMessage: err.message
                }));
                dispatch(toggleMenu());
            })
    }
};