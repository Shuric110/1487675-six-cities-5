import {ActionType} from "../action";
import {appData} from "./app-data";

const initialOfferDetails = {
  offerId: null,
  offer: null,
  nearestOffers: null,
  reviews: null
};

const initialState = {
  offers: [],
  favorites: null,
  cities: [],
  offerDetails: initialOfferDetails,
};

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

  {
    id: 3,
    city: cities[1],
    pictures: [
      `/img/apartment-03.jpg`,
      `/img/studio-01.jpg`,
      `/img/apartment-01.jpg`,
    ],
    placePicture: `/img/apartment-01.jpg`,
    coordinates: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198
    },
    mapZoom: 12,
    isPremium: false,
    isFavorite: true,
    nightlyCost: 132,
    title: `Canal View Prinsengracht`,
    type: `apartment`,
    rating: 4,
    description: `For travelers visiting Amsterdam, Canal View Prinsengracht is an excellent choice for rest and rejuvenation.
                  Well-known for its family-friendly environment and proximity to great restaurants and attractions, Canal View Prinsengracht makes it easy to enjoy the best of Amsterdam.`,
    bedrooms: 3,
    maxAdults: 5,
    features: [
      `Washing machine`,
      `Towels`,
      `Heating`,
    ],
    host: {
      name: `Max`,
      avatar: `/img/avatar-max.jpg`,
      isSuper: false
    },
  },
];

const favorites = [
  {
    city: cities[0].name,
    offers: [
      offers[0],
      offers[1],
    ]
  },
  {
    city: cities[1].name,
    offers: [
      offers[2],
    ]
  }
];

const reviews = [
  {
    id: 1,
    authorAvatar: `/img/avatar-angelina.jpg`,
    authorName: `Angelina`,
    rating: 4,
    date: new Date(`2020-10-17T03:24:00`),
    text: `We enjoyed our stay in the hotel. It was a very cozy atmosphere.`,
  },
  {
    id: 2,
    authorAvatar: `/img/avatar-max.jpg`,
    authorName: `Max`,
    rating: 1,
    date: new Date(`2019-11-19T02:54:10`),
    text: `There were roaches in the closet, several crawling the wall, several came from behind the mirror, and to top it off, found some dead ones in the refrigerator.`,
  },
];

describe(`Application data reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(appData(void 0, {})).toEqual(initialState);
  });

  it(`Reducer should update offers by initialize offers`, () => {
    expect(appData({
      offers: [offers[0]],
    }, {
      type: ActionType.INIT_OFFERS,
      payload: {offers},
    })).toEqual({
      offers,
    });
  });

  it(`Reducer should update favorites by initialize favorites`, () => {
    expect(appData({
      favorites: [favorites[0]],
    }, {
      type: ActionType.INIT_FAVORITES,
      payload: {favorites},
    })).toEqual({
      favorites,
    });
  });

  it(`Reducer should update cities by initialize cities`, () => {
    expect(appData({
      cities: [cities[0]],
    }, {
      type: ActionType.INIT_CITIES,
      payload: {cities},
    })).toEqual({
      cities,
    });
  });

  it(`Reducer should update offers when setting favorite flag`, () => {
    expect(appData({
      offers,
      favorites: null,
      offerDetails: initialOfferDetails
    }, {
      type: ActionType.UPDATE_FAVORITE_OFFER,
      payload: {id: 1, isFavorite: false},
    })).toHaveProperty(`offers`, [
      Object.assign({}, offers[0], {isFavorite: false}),
      offers[1],
      offers[2],
    ]);
  });

  it(`Reducer should update offers in offer details when setting favorite flag`, () => {
    expect(appData({
      offers: [],
      favorites: null,
      offerDetails: {
        offerId: null,
        offer: offers[1],
        nearestOffers: offers,
        reviews: null
      }
    }, {
      type: ActionType.UPDATE_FAVORITE_OFFER,
      payload: {id: 2, isFavorite: false},
    })).toHaveProperty(`offerDetails.offer`,
        Object.assign({}, offers[1], {isFavorite: false})
    );

    expect(appData({
      offers: [],
      favorites: null,
      offerDetails: {
        offerId: null,
        offer: offers[1],
        nearestOffers: offers,
        reviews: null
      }
    }, {
      type: ActionType.UPDATE_FAVORITE_OFFER,
      payload: {id: 2, isFavorite: false},
    })).toHaveProperty(`offerDetails.nearestOffers`, [
      offers[0],
      Object.assign({}, offers[1], {isFavorite: false}),
      offers[2],
    ]);
  });

  it(`Reducer should clear favorites when setting favorite flag to true of any offer`, () => {
    expect(appData({
      offers: [],
      favorites,
      offerDetails: initialOfferDetails
    }, {
      type: ActionType.UPDATE_FAVORITE_OFFER,
      payload: {id: 15, isFavorite: true},
    })).toHaveProperty(`favorites`, null);
  });

  it(`Reducer should remove an offer from favorites when setting it's favorite flag to false`, () => {
    expect(appData({
      offers: [],
      favorites,
      offerDetails: initialOfferDetails
    }, {
      type: ActionType.UPDATE_FAVORITE_OFFER,
      payload: {id: 1, isFavorite: false},
    })).toHaveProperty(`favorites`, [
      {
        city: cities[0].name,
        offers: [
          offers[1],
        ]
      },
      {
        city: cities[1].name,
        offers: [
          offers[2],
        ]
      }
    ]);
  });

  it(`Reducer should remove an offer with it's city from favorites when setting offer's favorite flag to false and the offer is the last in the city`, () => {
    expect(appData({
      offers: [],
      favorites,
      offerDetails: initialOfferDetails
    }, {
      type: ActionType.UPDATE_FAVORITE_OFFER,
      payload: {id: 3, isFavorite: false},
    })).toHaveProperty(`favorites`, [
      {
        city: cities[0].name,
        offers: [
          offers[0],
          offers[1],
        ]
      },
    ]);
  });

  it(`Reducer should clear offer details and set id when initializing offer details`, () => {
    expect(appData({
      offerDetails: {
        offerId: 10,
        offer: [],
        nearestOffers: [],
        reviews: []
      }
    }, {
      type: ActionType.INIT_OFFER_DETAILS,
      payload: {offerId: 20},
    })).toEqual({
      offerDetails: {
        offerId: 20,
        offer: null,
        nearestOffers: null,
        reviews: null
      }
    });
  });

  it(`Reducer should update offer details's when updating offer details and new data offer's id match id saved in state`, () => {
    expect(appData({
      offerDetails: {
        offerId: 1,
        offer: [],
        nearestOffers: [],
        reviews: []
      }
    }, {
      type: ActionType.UPDATE_OFFER_DETAILS,
      payload: {
        offerId: 1,
        details: {
          offer: offers[0],
          nearestOffers: offers,
          reviews
        }
      },
    })).toEqual({
      offerDetails: {
        offerId: 1,
        offer: offers[0],
        nearestOffers: offers,
        reviews
      }
    });
  });

  it(`Reducer shouldn't update offer details's when updating offer details and new data offer's id doesn't match id saved in state`, () => {
    expect(appData({
      offerDetails: {
        offerId: 1,
        offer: [],
        nearestOffers: [],
        reviews: []
      }
    }, {
      type: ActionType.UPDATE_OFFER_DETAILS,
      payload: {
        offerId: 2,
        details: {
          offer: offers[0],
          nearestOffers: offers,
          reviews
        }
      },
    })).toEqual({
      offerDetails: {
        offerId: 1,
        offer: [],
        nearestOffers: [],
        reviews: []
      }
    });
  });


});
