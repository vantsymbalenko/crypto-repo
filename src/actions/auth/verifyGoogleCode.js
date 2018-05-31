import { VERIFY_GOOGLE_CODE_ADDRESS } from "../../constants/authConst";

export const verifyGoogleCode = (secret, code) => {
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ tempSecret: secret, token: code })
  };
  return fetch(VERIFY_GOOGLE_CODE_ADDRESS + "twofactor/verify", settings).then(
    response => response.json()
  )
    .then(() => ({status: 200, text: "verify enabled"}))
};
