import { ENABLE_GOOGLE_AUTH, VERIFY_GOOGLE_CODE_ADDRESS } from "../../../constants/authConst";
import { toggleErrorModal } from "../../modals/errorModal";
import { enableButton } from "../../enableButton";

/*** action creater for save secret code and QRImage to redux store ***/
const setGoogleAuthenticatorData = (secret, QRCodeImageSrc) => ({
  type: ENABLE_GOOGLE_AUTH,
  payload: {
    secret: secret,
    QRCodeImgSrc: QRCodeImageSrc
  }
});

/*** request to server to get QR image path and secret word ***/
export const showGoogleAuthenticationSetup = ()  => {
  return dispatch => {

    const settings = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: null
    };

    return fetch(VERIFY_GOOGLE_CODE_ADDRESS + "twofactor/setup", settings)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setGoogleAuthenticatorData(data.tempSecret, data.dataURL));

        dispatch(enableButton());
      })
      .catch((err) => {
        const error = {
          errorCode: err.code,
          errorMessage: err.message
        };
        dispatch(toggleErrorModal(error));
        dispatch(enableButton());
      })
  }
};
