import {AuthorizationStatus} from "../../const";
import {ActionType} from "../action";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authorizationInfo: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_AUTHORIZATION:
      const {status, authInfo} = action.payload;
      return Object.assign({}, state, {
        authorizationStatus: status,
        authorizationInfo: authInfo,
      });
  }

  return state;
};

export {user};
