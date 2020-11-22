import {ActionCreator} from "./action";
import {AuthorizationStatus, AppRoute} from "../const";

export const AsyncActionCreator = {
  fetchHotelsAndCities() {
    return (dispatch, getState, api) => (
      api.getOffersAndCities(getState().DATA.cities)
        .then(({offers, cities}) => {
          dispatch(ActionCreator.initCities(cities));
          dispatch(ActionCreator.initOffers(offers));
        })
    );
  },

  fetchFavorites() {
    return (dispatch, getState, api) => (
      api.getFavorites()
        .then((favorites) => {
          dispatch(ActionCreator.initFavorites(favorites));
        })
    );
  },

  fetchOfferDetails(offerId) {
    return (dispatch, getState, api) => {
      dispatch(ActionCreator.initOfferDetails(offerId));

      Promise.all([
        api.getOfferById(offerId),
        api.getNearestOffersById(offerId),
        api.getReviewsByOfferId(offerId),
      ])
      .then(([offer, nearestOffers, reviews]) => {
        dispatch(ActionCreator.updateOfferDetails(offerId, {offer, nearestOffers, reviews}));
      });
    };
  },

  setIsFavorite(offerId, isFavorite) {
    return (dispatch, _getState, api) => (
      api.setFavorite(offerId, isFavorite)
        .then((offer) => dispatch(ActionCreator.updateFavoriteOffer(offer.id, offer.isFavorite)))
        .catch(() => {})
    );
  },

  postReview(offerId, {text, rating}, {successCallback, errorCallback}) {
    return (dispatch, _getState, api) => (
      api.postReview(offerId, text, rating)
        .then((reviews) => {
          dispatch(ActionCreator.updateOfferDetails(offerId, {reviews}));
          if (successCallback) {
            successCallback();
          }
        })
        .catch(() => {
          if (errorCallback) {
            errorCallback();
          }
        })
    );
  },

  checkAuthorization() {
    return (dispatch, _getState, api) => (
      api.checkAuthorization()
        .then((authInfo) => dispatch(ActionCreator.updateAuthorization(authInfo ? AuthorizationStatus.AUTH : AuthorizationStatus.NO_AUTH, authInfo)))
    );
  },

  login(email, password, returnUrl) {
    return (dispatch, _getState, api) => (
      api.login(email, password)
        .then((authInfo) => dispatch(ActionCreator.updateAuthorization(AuthorizationStatus.AUTH, authInfo)))
        .then(() => dispatch(ActionCreator.redirectToRoute(returnUrl || AppRoute.ROOT)))
    );
  },

};
