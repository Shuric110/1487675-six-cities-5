export const ActionType = {
  SET_CURRENT_CITY: `SET_CURRENT_CITY`,
};

export const ActionCreator = {
  setCurrentCity: (city) => ({
    type: ActionType.SET_CURRENT_CITY,
    payload: {city},
  }),
};
