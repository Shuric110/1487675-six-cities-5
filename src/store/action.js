export const ActionType = {
  SET_CURRENT_CITY: `SET_CURRENT_CITY`,
  SET_SORT_TYPE: `SET_SORT_TYPE`,
  SET_ACTIVE_OFFER: `SET_ACTIVE_OFFER`,
  CLEAR_ACTIVE_OFFER: `CLEAR_ACTIVE_OFFER`,

  INIT_CITIES: `INIT_CITIES`,
  INIT_OFFERS: `INIT_OFFERS`,
  INIT_FAVORITES: `INIT_FAVORITES`,
  UPDATE_FAVORITE_OFFER: `UPDATE_FAVORITE_OFFER`,

  INIT_OFFER_DETAILS: `INIT_OFFER_DETAILS`,
  UPDATE_OFFER_DETAILS: `UPDATE_OFFER_DETAILS`,

  UPDATE_AUTHORIZATION: `UPDATE_AUTHORIZATION`,

  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
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

  initOffers: (offers) => ({
    type: ActionType.INIT_OFFERS,
    payload: {offers},
  }),

  initFavorites: (favorites) => ({
    type: ActionType.INIT_FAVORITES,
    payload: {favorites},
  }),

  initCities: (cities) => ({
    type: ActionType.INIT_CITIES,
    payload: {cities},
  }),

  updateAuthorization: (status, authInfo) => ({
    type: ActionType.UPDATE_AUTHORIZATION,
    payload: {status, authInfo},
  }),

  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),

  updateFavoriteOffer: (id, isFavorite) => ({
    type: ActionType.UPDATE_FAVORITE_OFFER,
    payload: {id, isFavorite},
  }),

  initOfferDetails: (offerId) => ({
    type: ActionType.INIT_OFFER_DETAILS,
    payload: {offerId},
  }),

  updateOfferDetails: (offerId, details) => ({
    type: ActionType.UPDATE_OFFER_DETAILS,
    payload: {offerId, details},
  }),
};
