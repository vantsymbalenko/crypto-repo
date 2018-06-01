import {
  AUTH_USER, PRESIGN_IN, NOT_AUTH, GET_USER_INFO, NONE, REQ, ENABLE_GOOGLE_AUTH,
  LOGOUT, REQUEST_END
} from "../constants/authConst";

const initialState = {
  authStatus: NOT_AUTH,
  reqStatus: NONE,
  usersData: {}
};

export const authData = (state = initialState, action) => {
  switch (action.type) {
    case PRESIGN_IN: {
      return {
        ...state,
        authStatus: PRESIGN_IN
      }
    }
    case GET_USER_INFO: {
      return {
        ...state,
        authStatus: AUTH_USER,
        usersData: {
            ...state.usersData,
          ...action.payload
        }
      }
    }
    case NOT_AUTH: {
      return {
        ...state,
        authStatus: NOT_AUTH
      }
    }
      case REQUEST_END: {
        return {
            ...state,
            reqStatus: REQUEST_END
        }
      }
      case ENABLE_GOOGLE_AUTH: {
        return{
            ...state,
            ...action.payload
        }
      }
      case LOGOUT: {
        return {
            ...initialState
        }
      }
    default:
      return state;
  }
};
