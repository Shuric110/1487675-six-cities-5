import {ActionType} from "../action";
import {user} from "./user";

const authInfo = {
  id: 1,
  avatar: `/img/avatar-max.jpg`,
  email: `test@test.com`,
  isPro: false,
  name: `Max`,
};

describe(`User reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(user(void 0, {})).toEqual({
      authorizationStatus: `NO_AUTH`,
      authorizationInfo: null,
    });
  });

  it(`Reducer should update authorization information fields by update authorization`, () => {
    expect(user({
      authorizationStatus: `NO_AUTH`,
      authorizationInfo: null,
    }, {
      type: ActionType.UPDATE_AUTHORIZATION,
      payload: {
        status: `AUTH`,
        authInfo,
      },
    })).toEqual({
      authorizationStatus: `AUTH`,
      authorizationInfo: authInfo,
    });
  });
});
