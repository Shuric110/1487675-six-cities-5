import {AuthorizationStatus} from "../../../const";
import {ActionType} from "../../action";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationInfo: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload.status,
        authorizationInfo: action.payload.authInfo,
      });
  }

  return state;
};

export {user};
