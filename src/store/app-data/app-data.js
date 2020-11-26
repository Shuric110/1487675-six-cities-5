import {extend} from "../../util";
import {ActionType} from "../action";

const initialState = {
  offers: [],
  favorites: [],
  cities: [],
};

const appData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INIT_OFFERS:
      const {offers} = action.payload;
      return extend(state, {
        offers,
      });
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
  }

  return state;
};

export {appData};
