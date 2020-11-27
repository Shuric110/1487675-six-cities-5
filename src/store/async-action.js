import {ActionCreator} from "./action";
import {AuthorizationStatus, AppRoute} from "../const";
import {HttpCode} from "../services/api";

const formatErrorMessage = (text, error) =>
  `${text} (${error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message})`;

export const AsyncActionCreator = {
  fetchHotelsAndCities() {
    return (dispatch, getState, api) => (
      api.getOffersAndCities(getState().DATA.cities)
        .then(({offers, cities}) => {
          dispatch(ActionCreator.initCities(cities));
          dispatch(ActionCreator.initOffers(offers));
        })
        .catch((err) => {
          if (!err.response || err.response.status !== HttpCode.UNAUTHORIZED) {
            dispatch(ActionCreator.showMessage(formatErrorMessage(`Error quering offers`, err)));
          }
        })
    );
  },

  fetchFavorites() {
    return (dispatch, getState, api) => (
      api.getFavorites()
        .then((favorites) => {
          dispatch(ActionCreator.initFavorites(favorites));
        })
        .catch((err) => {
          if (!err.response || err.response.status !== HttpCode.UNAUTHORIZED) {
            dispatch(ActionCreator.showMessage(formatErrorMessage(`Error quering favorites`, err)));
          }
        })
    );
  },

  fetchOfferDetails(offerId) {
    return (dispatch, getState, api) => {
      dispatch(ActionCreator.initOfferDetails(offerId));

      return Promise.all([
        api.getOfferById(offerId),
        api.getNearestOffersById(offerId),
        api.getReviewsByOfferId(offerId),
      ])
      .then(([offer, nearestOffers, reviews]) => {
        dispatch(ActionCreator.updateOfferDetails(offerId, {offer, nearestOffers, reviews}));
      })
      .catch((err) => {
        if (!err.response || err.response.status !== HttpCode.UNAUTHORIZED) {
          dispatch(ActionCreator.showMessage(formatErrorMessage(`Error quering offer details`, err)));
        }
      });
    };
  },

  setIsFavorite(offerId, isFavorite) {
    return (dispatch, _getState, api) => (
      api.setFavorite(offerId, isFavorite)
        .then((offer) => dispatch(ActionCreator.updateFavoriteOffer(offer.id, offer.isFavorite)))
        .catch((err) => {
          if (!err.response || err.response.status !== HttpCode.UNAUTHORIZED) {
            dispatch(ActionCreator.showMessage(formatErrorMessage(`Error adding or removing favorite`, err)));
          }
        })
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
        .catch((err) => {
          if (!err.response || err.response.status !== HttpCode.UNAUTHORIZED) {
            dispatch(ActionCreator.showMessage(formatErrorMessage(`Error posting the comment`, err)));
          }
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
        .catch((err) => {
          dispatch(ActionCreator.showMessage(formatErrorMessage(`Error quering authorization data`, err)));
        })
    );
  },

  login(email, password, returnUrl) {
    return (dispatch, _getState, api) => (
      api.login(email, password)
        .then((authInfo) => dispatch(ActionCreator.updateAuthorization(AuthorizationStatus.AUTH, authInfo)))
        // Перезапрос загруженных данных
        .then(() => dispatch(AsyncActionCreator.fetchHotelsAndCities()))
        .then(() => dispatch(ActionCreator.initFavorites(null)))
        .then(() => dispatch(ActionCreator.initOfferDetails(null)))
        // Переход на обратный адрес
        .then(() => dispatch(ActionCreator.redirectToRoute(returnUrl || AppRoute.ROOT)))
        .catch((err) => {
          dispatch(ActionCreator.showMessage(formatErrorMessage(`Error logging in`, err)));
        })
    );
  },

};
