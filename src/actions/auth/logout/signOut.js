import {fire} from "../../../FirebaseConfig/Fire";
import {toggleErrorModal} from "../../modals/errorModal";
import {toggleMenu} from "../../modals/toggleMenu";
import {LOGOUT} from "../../../constants/authConst";

export const signOut = () => {
    return dispatch => {
        return fire.auth().signOut()
            .then(() => {
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