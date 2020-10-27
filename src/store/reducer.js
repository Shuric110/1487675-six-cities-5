import {extend} from "../util";
import {ActionType} from "./action";

import CITIES from "../mocks/cities";
import OFFERS from "../mocks/offers";

const initialState = {
  currentCity: CITIES[0],
  cities: CITIES,
  offers: OFFERS
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_CURRENT_CITY:
      const {city} = action.payload;
      return extend(state, {
        currentCity: city,
      });
  }

  return state;
};

export {reducer};
