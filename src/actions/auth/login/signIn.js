import { EMAIL_NOT_VERIFIED_MESSAGE } from "../../../constants/authConst";
import { fire, firebaseFirestore } from "../../../FirebaseConfig/Fire";
import { toggleErrorModal } from "../../modals/errorModal";
import { signInSuccess } from "../signInSuccess";
import { verifyGoogleCode } from "../googleApi/verifyGoogleCode";
import { showGoogleAuthenticationSetup } from "./showGoogleAuthenticationSetup";
import { setSecretCode } from "./setSecretCode";
import { disableButtons, enableButtons } from "../requestStatus";
import { FIREBASE_COLLECTION_USER } from "../../../constants/appConst";

export const signIn = (email, password, code) => {
  return async (dispatch, getState) => {
    try {
      /*** disable sign in button ***/
      dispatch(disableButtons());

      const state = getState(),
        userThatClickedSignIn = await fire
          .auth()
          .signInWithEmailAndPassword(email, password);
      let secret = state.authData.secret;

      /*** if is user and user have verified email  => get user data***/
      if (userThatClickedSignIn && userThatClickedSignIn.user.emailVerified) {
        const uid = userThatClickedSignIn.user.uid,
          usersDataFromFirestore = await firebaseFirestore
            .collection(FIREBASE_COLLECTION_USER)
            .doc(uid)
            .get(),
          usersInfoFromFirestore = await usersDataFromFirestore.data();

        /*** if user don't have secret then use secret that will be get from showGoogleAuthenticationSetup ***/
        secret = usersInfoFromFirestore.secret || secret;
        if (usersInfoFromFirestore && secret) {
          const responseVerifyGoogleCode = await verifyGoogleCode(secret, code);
          if (responseVerifyGoogleCode.status === 200) {
            if (!usersInfoFromFirestore.secret) {
              await setSecretCode({ secret: secret });
            }
            dispatch(signInSuccess(usersInfoFromFirestore));
            dispatch(enableButtons());

            /*** if response from google verification is 400 ( google code is wrong) then just show this is modal ***/
          } else if (responseVerifyGoogleCode.status === 400) {
            const error = {
              errorCode: responseVerifyGoogleCode.status,
              errorMessage: responseVerifyGoogleCode.message
            };

            dispatch(toggleErrorModal(error));
            dispatch(enableButtons());
          }
        } else {
          dispatch(showGoogleAuthenticationSetup());
        }
      } else {
        const error = {
          errorCode: "400",
          errorMessage: EMAIL_NOT_VERIFIED_MESSAGE
        };
        dispatch(toggleErrorModal(error));
        dispatch(enableButtons());
      }
    } catch (err) {
      const error = {
        errorCode: err.code,
        errorMessage: err.message
      };
      dispatch(toggleErrorModal(error));
      dispatch(enableButtons());
    }
  };
};
