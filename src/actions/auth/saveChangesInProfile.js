import {IMAGE_FOLDER} from "../../constants/authConst";
import {preSignInStatus} from "./preSignInStatus";
import firebase from 'firebase';
import {updateInfo} from "./updateInfo";
import {toggleErrorModal} from "../modals/errorModal";
import {verifyGoogleCode} from "./verifyGoogleCode";
import {fire} from "../../FirebaseConfig/Fire";
import {getUserInfo} from "./getUserInfo";

export const saveChanges = (data, file) => {
    console.log(file);
    return (dispatch, getState) => {
        dispatch(preSignInStatus());
        const secret = getState().authData.usersData.secret;
        verifyGoogleCode(secret,data.googleCode)
            .then((response) => {
                if(response.status === 200){
                    if(file){
                        const storage = firebase.storage().ref(IMAGE_FOLDER + file.name);
                        const uploadTask = storage.put(file);

                        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                            function(snapshot) {
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Upload is ' + progress + '% done');
                                switch (snapshot.state) {
                                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                                        console.log('Upload is paused');
                                        break;
                                    case firebase.storage.TaskState.RUNNING: // or 'running'
                                        console.log('Upload is running');
                                        break;
                                }
                            }, function(error) {

                                // A full list of error codes is available at
                                // https://firebase.google.com/docs/storage/web/handle-errors
                                switch (error.code) {
                                    case 'storage/unauthorized':
                                        // User doesn't have permission to access the object
                                        break;

                                    case 'storage/canceled':
                                        // User canceled the upload
                                        break;
                                    case 'storage/unknown':
                                        // Unknown error occurred, inspect error.serverResponse
                                        break;
                                }
                            }, function() {
                                // Upload completed successfully, now we can get the download URL
                                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                    dispatch(updateInfo({...data, imgSrc: downloadURL}));
                                    console.log('File available at', downloadURL);
                                });
                            });
                    }
                    dispatch(updateInfo(data))
                        .then(() => {
                            getUserInfo(fire.auth().currentUser.uid);
                        })
                        .catch((err) => {
                            const error = {
                                errorCode: err.code,
                                errorMessage: err.message
                            };
                            dispatch(toggleErrorModal(error));
                        });
                }else {
                    const err = {
                        errorCode : "400",
                        errorMessage: "Google code is wrong"
                    };
                    dispatch(toggleErrorModal(err));
                }
            })


    }
};
