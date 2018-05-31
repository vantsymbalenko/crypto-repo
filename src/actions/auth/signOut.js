import {fire} from "../../FirebaseConfig/Fire";
import {enableButton} from "../enableButton";
import {toggleErrorModal} from "../modals/errorModal";
import {toggleMenu} from "../modals/toggleMenu";

export const signOut = () => {
    console.log("work");
    return dispatch => {
        return fire.auth().signOut()
            .then(() => {
                dispatch(enableButton());
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
}