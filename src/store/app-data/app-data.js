import {extend} from "../../util";
import {ActionType} from "../action";

const initialState = {
  api: null,
  offers: [],
  favorites: null,
  cities: [],
};

const appData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_API:
      const {api} = action.payload;
      return extend(state, {
        api,
      });

    case ActionType.INIT_OFFERS:
    {
      const {offers} = action.payload;
      return extend(state, {
        offers,
      });
    }

    case ActionType.INIT_FAVORITES:
      const {favorites} = action.payload;
      return extend(state, {
        favorites,
      });

    case ActionType.INIT_CITIES:
      const {cities} = action.payload;
      return extend(state, {
        cities,
      });

    case ActionType.UPDATE_FAVORITE_OFFER:
      const {id, isFavorite} = action.payload;
      const newState = {};

      newState.offers = state.offers.map((offer) => (offer.id !== id ? offer : extend(offer, {isFavorite})));
      if (state.favorites) {
        newState.favorites = isFavorite ? null :
          state.favorites.map(({city, offers}) => ({
            city,
            offers: offers.filter((offer) => offer.id !== id)
          }))
          .filter(({offers}) => offers.length > 0);
      }

      return extend(state, newState);
  }

  return state;
};

export {appData};
