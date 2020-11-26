import {ActionCreator} from "./action";

export const AsyncActionCreator = {
  fetchHotelsAndCities() {
    return (dispatch, getState, api) => (
      api.getOffersAndCities(getState().DATA.cities)
        .then(({offers, cities}) => {
          dispatch(ActionCreator.initCities(cities));
          dispatch(ActionCreator.initOffers(offers));
        })
    );
  }

};
