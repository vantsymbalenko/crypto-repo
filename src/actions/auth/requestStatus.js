import { REQ, NONE } from "../../constants/authConst";

/*** action creator which show that request now is processing ***/
export const disableButtons = () => {
  return {
    type: REQ
  };
};

/*** action creator which show that request is ended ***/
export const enableButtons = () => {
  return {
    type: NONE
  };
};
