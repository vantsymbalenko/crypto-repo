import { combineReducers } from "redux";
import { authData } from "./authData";
import { appData } from "./appData";
import { modals } from "./modals";

export default combineReducers({
  authData,
  appData,
  modals
});
