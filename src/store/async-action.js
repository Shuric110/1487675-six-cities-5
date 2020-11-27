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
