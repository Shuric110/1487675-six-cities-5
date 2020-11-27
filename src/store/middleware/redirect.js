import browserHistory from "../../browser-history";
import {ActionType} from "../action";

export const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    const {url, state} = action.payload;
    browserHistory.push(url, state);
  }

  return next(action);
};
