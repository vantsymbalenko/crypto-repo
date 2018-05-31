import {
    EMAIL_NOT_VERIFIED_MESSAGE, ENABLE_GOOGLE_AUTH, VERIFY_GOOGLE_CODE_ADDRESS,
} from "../../constants/authConst";
import { fire } from "../../FirebaseConfig/Fire";
import {toggleErrorModal} from "../modals/errorModal";
import { preSignInStatus } from "./preSignInStatus";
import { enableButton } from "../enableButton";
import {getUserInfo} from "./getUserInfo";
import {signInSuccess} from "./signInSuccess";


export const signIn = (email, password, code, secret) => {
    console.log("arguments", code);
  return dispatch => {
    /*** disable sign in button ***/
    dispatch(preSignInStatus());

    return fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        if (response.user && response.user.emailVerified) {
            // fetch(VERIFY_GOOGLE_CODE_ADDRESS + "/twofactor/setup", {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({a: 1, b: 'Textual content'})
            // });
          const uid = fire.auth().currentUser.uid;
          dispatch(getUserInfo(uid))
              .then((response) => {
                  console.log("response sign in", response);
                  if(code){
                      fetch(VERIFY_GOOGLE_CODE_ADDRESS + "twofactor/verify", {
                          method: 'POST',
                          headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({tempSecret: secret, token: code})
                      })
                          .then((response) => {
                              return response.json();
                              // console.log("response fetch");
                              // dispatch(signInSuccess())
                              // if(response.status == "200"){
                              //     dispatch(signInSuccess());
                              // }else{
                              //     dispatch(toggleErrorModal({
                              //         errorCode: "Authorization",
                              //         errorMessage: "Email, password or Google Code is wrong. Please check and try again"
                              //     }))
                              // }
                          })
                          .then((json) => {
                              console.log(json);
                              if(json.status === 200){
                                  dispatch(signInSuccess())
                              }
                              if(json.status === 400){
                                  dispatch(enableButton())
                              }
                          })
                  }else{
                      fetch(VERIFY_GOOGLE_CODE_ADDRESS + "twofactor/setup", {
                              method: 'POST',
                              headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                              },

                              body: null
                          })
                          .then((response) => {
                              console.log(response);
                              return response.json()
                          })
                          .then((json) => {
                              dispatch(enableButton());
                              dispatch({
                                  type:ENABLE_GOOGLE_AUTH,
                                  payload: {
                                      secret: json.tempSecret,
                                      qrCodeImgSrc: json.dataURL
                                  }
                              });
                          });

                      console.log("google authorization not enabled");
                  }
              })
        } else {
          dispatch(
            toggleErrorModal({
              errorCode: "400",
              errorMessage: EMAIL_NOT_VERIFIED_MESSAGE
            })
          );

          /*** enable login button ***/
          dispatch(enableButton());
        }
      })
      .catch(err => {
        dispatch(
          toggleErrorModal({
            errorCode: err.code,
            errorMessage: err.message
          })
        );
        dispatch(enableButton());
      });
  };
};
