import {
  ActionCreator,
  ActionType,
} from "./action";


describe(`Action creators work correctly`, () => {
  it(`Action creator for setting current city returns correct action`, () => {
    const city = {id: 1};

    expect(ActionCreator.setCurrentCity(city)).toEqual({
      type: ActionType.SET_CURRENT_CITY,
      payload: {city},
    });
  });

  it(`Action creator for setting current sort type returns correct action`, () => {
    expect(ActionCreator.setSortType(`PRICE_ASC`)).toEqual({
      type: ActionType.SET_SORT_TYPE,
      payload: {sortType: `PRICE_ASC`},
    });
  });

  it(`Action creator for setting active offer returns correct action`, () => {
    const offer = {id: 2};

    expect(ActionCreator.setActiveOffer(offer)).toEqual({
      type: ActionType.SET_ACTIVE_OFFER,
      payload: {offer},
    });
  });

  it(`Action creator for clearing active offer returns correct action`, () => {
    const offer = {id: 3};

    expect(ActionCreator.clearActiveOffer(offer)).toEqual({
      type: ActionType.CLEAR_ACTIVE_OFFER,
      payload: {oldOffer: offer},
    });
  });

  it(`Action creator for initializing offers returns correct action`, () => {
    const offers = [
      {id: 1},
      {id: 2},
      {id: 3},
    ];

    expect(ActionCreator.initOffers(offers)).toEqual({
      type: ActionType.INIT_OFFERS,
      payload: {offers},
    });
  });

  it(`Action creator for initializing favorites returns correct action`, () => {
    const favorites = [
      {
        city: `Amsterdam`,
        offers: [
          {id: 1},
          {id: 2},
          {id: 3},
        ]
      }
    ];

    expect(ActionCreator.initFavorites(favorites)).toEqual({
      type: ActionType.INIT_FAVORITES,
      payload: {favorites},
    });
  });

  it(`Action creator for initializing cities returns correct action`, () => {
    const cities = [
      {id: 1},
      {id: 2},
      {id: 3},
    ];

    expect(ActionCreator.initCities(cities)).toEqual({
      type: ActionType.INIT_CITIES,
      payload: {cities},
    });
  });

  it(`Action creator for updating authorization data returns correct action`, () => {
    const authInfo = {name: `Max`};

    expect(ActionCreator.updateAuthorization(`AUTH`, authInfo)).toEqual({
      type: ActionType.UPDATE_AUTHORIZATION,
      payload: {
        status: `AUTH`,
        authInfo
      },
    });
  });

  it(`Action creator for redirecting returns correct action`, () => {
    expect(ActionCreator.redirectToRoute(`/login`, {returnUrl: `/favorite`})).toEqual({
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: {
        url: `/login`,
        state: {returnUrl: `/favorite`}
      },
    });
  });

  it(`Action creator for updating offer's favorite flag returns correct action`, () => {
    expect(ActionCreator.updateFavoriteOffer(15, true)).toEqual({
      type: ActionType.UPDATE_FAVORITE_OFFER,
      payload: {
        id: 15,
        isFavorite: true,
      },
    });
  });

  it(`Action creator for offer details initializing returns correct action`, () => {
    expect(ActionCreator.initOfferDetails(20)).toEqual({
      type: ActionType.INIT_OFFER_DETAILS,
      payload: {
        offerId: 20,
      },
    });
  });

  it(`Action creator for offer details updating returns correct action`, () => {
    const details = {
      offer: {id: 1},
      nearestOffers: [{id: 1}, {id: 2}, {id: 3}],
      reviews: [{id: 1}, {id: 2}],
    };

    expect(ActionCreator.updateOfferDetails(2, details)).toEqual({
      type: ActionType.UPDATE_OFFER_DETAILS,
      payload: {
        offerId: 2,
        details
      },
    });
  });

  it(`Action creator for message displaying returns correct action`, () => {
    expect(ActionCreator.showMessage(`Message text`)).toEqual({
      type: ActionType.SHOW_MESSAGE,
      payload: {
        text: `Message text`,
      },
    });
  });

  it(`Action creator for fading out message returns correct action`, () => {
    expect(ActionCreator.fadeoutMessage(5)).toEqual({
      type: ActionType.FADEOUT_MESSAGE,
      payload: {
        id: 5,
      },
    });
  });

  it(`Action creator for removing message returns correct action`, () => {
    expect(ActionCreator.removeMessage(6)).toEqual({
      type: ActionType.REMOVE_MESSAGE,
      payload: {
        id: 6,
      },
    });
  });
});
