import { SET_LOADER } from "../constants/appConst";
import { NONE, REQ } from "../constants/authConst";

const initialState = {
  isLoading: false,
  reqStatus: NONE
};

export const appData = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER: {
      return {
        ...state,
        isLoading: action.payload
      };
    }
    case NONE: {
      return {
        ...state,
        reqStatus: NONE
      };
    }
    case REQ: {
      return {
        ...state,
        reqStatus: REQ
      };
    }
    default:
      return state;
  }
};
