import { IMAGE_FOLDER } from "../../constants/authConst";
import firebase from "firebase";
import { updateInfo } from "./updateInfo";
import { toggleErrorModal } from "../modals/errorModal";
import { verifyGoogleCode } from "./googleApi/verifyGoogleCode";
import { fire } from "../../FirebaseConfig/Fire";
import { getUserInfo } from "./getUserInfo";
import { disableButtons, enableButtons } from "./requestStatus";
import { signInSuccess } from "./signInSuccess";

export const saveChanges = (data, file) => {
  return (dispatch, getState) => {
    const secret = getState().authData.usersData.secret,
      user = fire.auth().currentUser;

    dispatch(disableButtons());

    verifyGoogleCode(secret, data.googleCode)
      .then(response => {
        /*** if google code is right then update info
         * else show that google code is wrong***/

        if (response.status === 200) {
          /*** if user change photo then first upload photo
           * to storage and then update info including new path to photo ***/
          if(data.email){
              user.updateEmail(data.email)
                .then(() => {
                    console.log("email was successfully update");
                    user.sendEmailVerification()
                      .then(() => {console.log("email was send")})
                      .catch(err => {
                          const error = {
                              errorCode: err.code,
                            errorMessage: err.message
                          };
                          dispatch(toggleErrorModal(error));
                      });
                })
                .catch((err) => {
                    const error = {
                        errorCode: err.code,
                      errorMessage: err.message
                    };
                    dispatch(toggleErrorModal(error));
                })
          }
          if (file) {
            uploadFile(file)
              .then(snapshot => {
                return snapshot.ref.getDownloadURL();
              })
              .then(downloadURL => {
                /*** updating information about user ***/
                dispatch(updateInfo({ ...data, imgSrc: downloadURL })).then(
                  () => {
                    dispatch(getUserInfo(user.uid)).then(data => {
                      dispatch(signInSuccess(data));
                    });
                  }
                );
              })
              .catch(err => {
                const error = {
                  errorCode: err.code,
                  errorMessage: err.message
                };
                dispatch(toggleErrorModal(error));
              });
          } else {
            /*** if user change only text data without new photo then
             * just update info and get new data from firestore ***/

            dispatch(updateInfo({ ...data }))
              .then(() => {
                dispatch(getUserInfo(user.uid)).then(data => {
                  dispatch(signInSuccess(data));
                });
              })
              .catch(err => {
                const error = {
                  errorCode: err.code,
                  errorMessage: err.message
                };
                dispatch(toggleErrorModal(error));
              });
          }
        } else {
          const err = {
            errorCode: "400",
            errorMessage: "Google code is wrong"
          };
          dispatch(toggleErrorModal(err));
        }
      })
      .catch(err => {
        const error = {
          errorCode: err.code,
          errorMessage: err.message
        };
        dispatch(toggleErrorModal(error));
      });

    dispatch(enableButtons());
  };
};

const uploadFile = file => {
  const storage = firebase.storage().ref(IMAGE_FOLDER + file.name);
  const uploadTask = storage.put(file);

  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log("Upload is paused");
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log("Upload is running");
          break;
      }
    },
    function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;

        case "storage/canceled":
          // User canceled the upload
          break;
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      });
    }
  );

  return uploadTask;
};
