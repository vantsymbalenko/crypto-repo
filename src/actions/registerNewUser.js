import { FIREBASE_COLLECTION_USER } from "../constants/appConst";
import { fire, firebaseFirestore } from "../FirebaseConfig/Fire";
import { toggleErrorModal } from "./modals/errorModal";
import { toggleSignUpSuccessModal } from "./modals/signUpModals";
import { disableButtons, enableButtons } from "./auth/requestStatus";

export const registerNewUser = data => {
  /*** validation storage can pass from state of component we don't want to write this storage
   * to firestore so we just cut this
   * ***/
  const { email, password, validationStorage, ...rest } = data;
  return dispatch => {
    /*** disable button ***/
    dispatch(disableButtons());

    /*** create user with help of email and password ***/
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const { uid } = response.user;

        /***
         *  if user was create successfully then set his data to firestore
         *  where uid is unique id of users created by firebase library
         *  and FIREBASE_COLLECTION_USER is name of users collection
         */

        firebaseFirestore
          .collection(FIREBASE_COLLECTION_USER)
          .doc(uid)
          .set({
            ...rest,
            referedUsers: []
          })
          .then(() => {
            firebaseFirestore
              .collection(FIREBASE_COLLECTION_USER)
              .doc(rest.refCode)
              .get()
              .then(response => {
                console.log("another user", response.data());
                if (response.data() && response.data().referedUsers) {
                  const { referedUsers } = response.data();
                  referedUsers.push({
                    userName: rest.firstName + " " + rest.lastName,
                    userUid: rest.refCode
                  });
                  firebaseFirestore
                    .collection(FIREBASE_COLLECTION_USER)
                    .doc(rest.refCode)
                    .update({
                      referedUsers: referedUsers
                    });
                }
                dispatch(enableButtons());
              })
              .then(() => {
                sendEmailVerification().then(() => {
                  /*** toogle email sign up modal with confirm than user was successfully registered
                   * and on his email was send verification email
                   * ***/

                  dispatch(toggleSignUpSuccessModal());
                  dispatch(enableButtons());
                })
                    .catch((err) => {
                        const error = {
                            errorCode: err.code,
                            errorMessage: err.message
                        };
                        dispatch(toggleErrorModal(error));
                        dispatch(enableButtons());
                    })
              })
              .catch(err => {
                const error = {
                  errorCode: err.code,
                  errorMessage: err.message
                };
                dispatch(toggleErrorModal(error));
                dispatch(enableButtons());
              });

            /*** send email verification ***/
          })
          .catch(err => {
            const error = {
              errorCode: err.code,
              errorMessage: err.message
            };
            dispatch(toggleErrorModal(error));
            dispatch(enableButtons());
          });
      })
      .catch(err => {
        const error = {
          errorCode: err.code,
          errorMessage: err.message
        };
        dispatch(toggleErrorModal(error));
        dispatch(enableButtons());
      });
  };
};

const sendEmailVerification = () => {
  return fire.auth().currentUser.sendEmailVerification();
};
