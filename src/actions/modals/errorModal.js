import {ERROR_MODAL} from "../../constants/authConst";

export const toggleErrorModal = data => {
  return {
    type: ERROR_MODAL,
    payload: { ...data }
  };
};
