import {extend} from "../../util";
import {ActionType} from "../action";
import {SortType} from "../../const";

const initialState = {
  currentCity: null,
  sortType: SortType.DEFAULT,
  activeOffer: null
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_CITY:
      const {city} = action.payload;
      return extend(state, {
        currentCity: city,
      });
    case ActionType.SET_SORT_TYPE:
      const {sortType} = action.payload;
      return extend(state, {
        sortType,
      });
    case ActionType.SET_ACTIVE_OFFER:
      const {offer} = action.payload;
      return extend(state, {
        activeOffer: offer,
      });
    case ActionType.CLEAR_ACTIVE_OFFER:
      const {oldOffer} = action.payload;
      if (oldOffer && oldOffer !== state.activeOffer) {
        return state;
      }
      return extend(state, {
        activeOffer: null,
      });
  }

  return state;
};

export {appState};