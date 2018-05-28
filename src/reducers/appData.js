import { SET_LOADER } from "../constants/appConst";

const initialState = {
  isLoading: false,
  isShowErrorModal: false,
  errorCode: "404",
  errorMessage: "Some Error Message"
};

export const appData = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER: {
      return {
        ...state,
        isLoading: action.payload
      };
    }

    default:
      return state;
  }
};
