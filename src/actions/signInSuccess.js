import {GET_USER_INFO} from "../constants/authConst";

export const signInSuccess = data => ({
    type: GET_USER_INFO,
    payload: data
});