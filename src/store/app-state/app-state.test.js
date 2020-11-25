import {ActionType} from "../action";
import {appState} from "./app-state";
import {SortType} from "../../const";

const cities = [
  {
    id: 1,
    name: `Paris`,
    coordinates: {
      latitude: 48.8606146,
      longitude: 2.3354553
    },
    zoom: 12,
  },
  {
    id: 2,
    name: `Amsterdam`,
    coordinates: {
      latitude: 48.8606146,
      longitude: 2.3354553
    },
    zoom: 12,
  },
];

const offers = [
  {
    id: 1,
    city: cities[0],
    pictures: [
      `/img/room.jpg`,
    ],
    placePicture: `/img/room.jpg`,
    coordinates: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198
    },
    mapZoom: 12,
    isPremium: false,
    isFavorite: true,
    nightlyCost: 80,
    title: `Wood and stone place`,
    type: `room`,
    rating: 4.2,
    description: `Excellent choice for travelers, offering many helpful amenities designed to enhance your stay.`,
    bedrooms: 1,
    maxAdults: 2,
    features: [
      `Wi-Fi`,
    ],
    host: {
      name: `Angelina`,
      avatar: `/img/avatar-angelina.jpg`,
      isSuper: true
    },
  },

  {
    id: 2,
    city: cities[0],
    pictures: [
      `/img/apartment-01.jpg`,
      `/img/apartment-02.jpg`,
    ],
    placePicture: `/img/studio-01.jpg`,
    coordinates: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198
    },
    mapZoom: 12,
    isPremium: true,
    isFavorite: true,
    nightlyCost: 80,
    title: `Wood and stone place`,
    type: `room`,
    rating: 4.2,
    description: `Excellent choice for travelers, offering many helpful amenities designed to enhance your stay.`,
    bedrooms: 1,
    maxAdults: 2,
    features: [
      `Wi-Fi`,
      `Washing machine`,
      `Cable TV`,
      `Fridge`
    ],
    host: {
      name: `Angelina`,
      avatar: `/img/avatar-angelina.jpg`,
      isSuper: true
    },
  },
];

const messages = [
  {
    id: 1,
    text: `Message 1`,
    isFadingOut: true,
  },
  {
    id: 2,
    text: `Message 2`,
    isFadingOut: false,
  },
  {
    id: 3,
    text: `Message 3`,
    isFadingOut: false,
  },
];

describe(`Application state reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(appState(void 0, {})).toEqual({
      currentCity: null,
      sortType: SortType.DEFAULT,
      activeOffer: null,
      messages: [],
    });
  });

  it(`Reducer should update current city by set current city`, () => {
    expect(appState({
      currentCity: cities[0],
    }, {
      type: ActionType.SET_CURRENT_CITY,
      payload: {city: cities[1]},
    })).toEqual({
      currentCity: cities[1]
    });
  });

  it(`Reducer should update current sort type by set sort type`, () => {
    expect(appState({
      sortType: SortType.DEFAULT,
    }, {
      type: ActionType.SET_SORT_TYPE,
      payload: {sortType: SortType.PRICE_ASC},
    })).toEqual({
      sortType: SortType.PRICE_ASC
    });
  });

  it(`Reducer should update active offer by set active offer`, () => {
    expect(appState({
      activeOffer: offers[0],
    }, {
      type: ActionType.SET_ACTIVE_OFFER,
      payload: {offer: offers[1]},
    })).toEqual({
      activeOffer: offers[1]
    });
  });

  it(`Reducer should set active offer to null by clear active offer when payload offer match current active offer`, () => {
    expect(appState({
      activeOffer: offers[0],
    }, {
      type: ActionType.CLEAR_ACTIVE_OFFER,
      payload: {oldOffer: offers[0]},
    })).toEqual({
      activeOffer: null
    });
  });

  it(`Reducer should set active offer to null by clear active offer when payload offer is null`, () => {
    expect(appState({
      activeOffer: offers[0],
    }, {
      type: ActionType.CLEAR_ACTIVE_OFFER,
      payload: {oldOffer: null},
    })).toEqual({
      activeOffer: null
    });
  });

  it(`Reducer should not modify active offer by clear active offer when payload offer does not match current active offer`, () => {
    expect(appState({
      activeOffer: offers[0],
    }, {
      type: ActionType.CLEAR_ACTIVE_OFFER,
      payload: {oldOffer: offers[1]},
    })).toEqual({
      activeOffer: offers[0]
    });
  });

  it(`Reducer should update current city to one of the new cities from payload by id by init cities`, () => {
    expect(appState({
      currentCity: Object.assign({}, cities[0]),
    }, {
      type: ActionType.INIT_CITIES,
      payload: {cities},
    }).currentCity).toBe(
        cities[0]
    );
  });

  it(`Reducer should update current city when it's null by init cities`, () => {
    expect(appState({
      currentCity: null,
    }, {
      type: ActionType.INIT_CITIES,
      payload: {cities},
    })).toEqual({
      currentCity: null
    });
  });

  it(`Reducer should add message to the messages list by show message`, () => {
    expect(appState({
      messages,
    }, {
      type: ActionType.SHOW_MESSAGE,
      payload: {
        id: 4,
        text: `Message 4`,
        isFadingOut: false,
      },
    })).toEqual({
      messages: [
        ...messages,
        {
          id: 4,
          text: `Message 4`,
          isFadingOut: false,
        }
      ]
    });
  });

  it(`Reducer remove message from the messages list by remove message`, () => {
    expect(appState({
      messages,
    }, {
      type: ActionType.REMOVE_MESSAGE,
      payload: {id: 2},
    })).toEqual({
      messages: [
        messages[0],
        messages[2],
      ]
    });
  });

  it(`Reducer should set message's fadeout property to true by fade out message`, () => {
    expect(appState({
      messages,
    }, {
      type: ActionType.FADEOUT_MESSAGE,
      payload: {id: 2},
    })).toEqual({
      messages: [
        messages[0],
        Object.assign({}, messages[1], {isFadingOut: true}),
        messages[2],
      ]
    });
  });


});
