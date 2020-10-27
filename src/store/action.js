export const ActionType = {
  SET_CURRENT_CITY: `SET_CURRENT_CITY`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  CLEAR_ACTIVE_OFFER: `CLEAR_ACTIVE_OFFER`,
};

export const ActionCreator = {
  setCurrentCity: (city) => ({
    type: ActionType.SET_CURRENT_CITY,
    payload: {city},
  }),
  setSortType: (sortType) => ({
    type: ActionType.SET_SORT_TYPE,
    payload: {sortType},
  }),
  setActiveOffer: (offer) => ({
    type: ActionType.SET_ACTIVE_OFFER,
    payload: {offer},
  }),
  clearActiveOffer: (oldOffer) => ({
    type: ActionType.CLEAR_ACTIVE_OFFER,
    payload: {oldOffer},
  }),
};
