import {extend} from "../../util";
import {ActionType} from "../action";
import {SortType} from "../../const";

const initialState = {
  currentCity: null,
  sortType: SortType.DEFAULT,
  activeOffer: null,
  messages: [],
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_CITY:
    {
      const {city} = action.payload;
      return extend(state, {
        currentCity: city,
      });
    }

    case ActionType.SET_SORT_TYPE:
    {
      const {sortType} = action.payload;
      return extend(state, {
        sortType,
      });
    }

    case ActionType.SET_ACTIVE_OFFER:
    {
      const {offer} = action.payload;
      return extend(state, {
        activeOffer: offer,
      });
    }

    case ActionType.CLEAR_ACTIVE_OFFER:
    {
      const {oldOffer} = action.payload;
      if (oldOffer && oldOffer !== state.activeOffer) {
        return state;
      }
      return extend(state, {
        activeOffer: null,
      });
    }

    case ActionType.INIT_CITIES:
    {
      // При обновлении списка городов обновим активный город

      if (!state.currentCity) {
        return state;
      }

      const currentCityId = state.currentCity.id;
      const {cities} = action.payload;

      const currentCity = cities.find(({id}) => id === currentCityId);
      return extend(state, {
        currentCity,
      });
    }

    case ActionType.SHOW_MESSAGE:
    {
      const message = action.payload;
      const prevMessages = state.messages;

      return extend(state, {
        messages: [...prevMessages, message]
      });
    }

    case ActionType.REMOVE_MESSAGE:
    {
      const {id} = action.payload;
      const prevMessages = state.messages;

      return extend(state, {
        messages: prevMessages.filter(({id: itemId}) => itemId !== id)
      });
    }

    case ActionType.FADEOUT_MESSAGE:
    {
      const {id} = action.payload;
      const prevMessages = state.messages;

      return extend(state, {
        messages: prevMessages.map((message) => message.id === id ? extend(message, {isFadingOut: true}) : message)
      });
    }
  }

  return state;
};

export {appState};
