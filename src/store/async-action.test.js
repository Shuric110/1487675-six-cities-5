import {ActionType} from "./action";
import {AsyncActionCreator} from "./async-action";

class ApiAdapterMock {
  constructor(authorized, error) {
    this._authorized = authorized;
    this._error = error;
  }

  _checkError(checkUnathorized = true) {
    if (checkUnathorized && !this._authorized) {
      return Promise.reject({
        response: {
          status: 401,
        },
        message: `_unauthorized_`
      });
    }

    if (this._error) {
      return Promise.reject({
        response: {
          status: 400,
        },
        message: `_error_`
      });
    }

    return null;
  }

  getOffersAndCities(initialCities) {
    return this._checkError() || Promise.resolve({
      cities: `${initialCities} modified`,
      offers: `offers fake data`,
    });
  }

  checkAuthorization() {
    return this._checkError(false) || (this._authorized ? Promise.resolve(`authorization fake data`) : Promise.resolve(null));
  }

  login(email, password) {
    return this._checkError() || Promise.resolve(`login fake data (${email}, ${password})`);
  }

  getOfferById(offerId) {
    return this._checkError() || Promise.resolve(`offer fake data (${offerId})`);
  }

  getNearestOffersById(offerId) {
    return this._checkError() || Promise.resolve(`nearest offers fake data (${offerId})`);
  }

  getReviewsByOfferId(offerId) {
    return this._checkError() || Promise.resolve(`reviews fake data (${offerId})`);
  }

  postReview(offerId, text, rating) {
    return this._checkError() || Promise.resolve(`reviews after post fake data (${offerId}, ${text}, ${rating})`);
  }

  setFavorite(offerId, isFavorite) {
    return this._checkError() || Promise.resolve({
      id: offerId,
      isFavorite,
      data: `offer after setting favorite fake data`
    });
  }

  getFavorites() {
    return this._checkError() || Promise.resolve(`favorites fake data`);
  }
}


describe(`Asynchronious actions work correctly (user is authentified)`, () => {
  const apiAdapterMock = new ApiAdapterMock(true, false);

  it(`Should make an async call and set new cities and offers`, () => {
    const action = AsyncActionCreator.fetchHotelsAndCities();
    const dispatch = jest.fn();

    return action(dispatch, () => ({"DATA": {cities: `cities fake data`}}), apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.INIT_CITIES,
          payload: {cities: `cities fake data modified`},
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.INIT_OFFERS,
          payload: {offers: `offers fake data`},
        });
      });
  });

  it(`Should make an async call and set new favorites`, () => {
    const action = AsyncActionCreator.fetchFavorites();
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.INIT_FAVORITES,
          payload: {favorites: `favorites fake data`},
        });
      });
  });

  it(`Should make an async call and set offer, reviews and nearest offers as offer details`, () => {
    const action = AsyncActionCreator.fetchOfferDetails(10);
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.INIT_OFFER_DETAILS,
          payload: {offerId: 10},
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.UPDATE_OFFER_DETAILS,
          payload: {offerId: 10, details: {
            offer: `offer fake data (10)`,
            nearestOffers: `nearest offers fake data (10)`,
            reviews: `reviews fake data (10)`
          }},
        });
      });
  });

  it(`Should make an async call and update favorite flag`, () => {
    const action = AsyncActionCreator.setIsFavorite(12, `fake favorite`);
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_FAVORITE_OFFER,
          payload: {id: 12, isFavorite: `fake favorite`},
        });
      });
  });

  it(`Should make an async call and update review list and call a callback`, () => {
    const successCallback = jest.fn();
    const action = AsyncActionCreator.postReview(13, {text: `test text`, rating: 3}, {successCallback});
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_OFFER_DETAILS,
          payload: {offerId: 13, details: {
            reviews: `reviews after post fake data (13, test text, 3)`
          }},
        });
        expect(successCallback).toHaveBeenCalledTimes(1);
      });
  });

  it(`Should make an async call and update an authorization information`, () => {
    const action = AsyncActionCreator.checkAuthorization();
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_AUTHORIZATION,
          payload: {
            status: `AUTH`,
            authInfo: `authorization fake data`
          },
        });
      });
  });

  it(`Should make an async call to login user and update an authorization information, reload/clear app data, redirect to return url`, () => {
    const action = AsyncActionCreator.login(`test@test.com`, `12345`, `/return`);
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_AUTHORIZATION,
          payload: {
            status: `AUTH`,
            authInfo: `login fake data (test@test.com, 12345)`
          },
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, expect.any(Function));
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.INIT_FAVORITES,
          payload: {favorites: null},
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: ActionType.INIT_OFFER_DETAILS,
          payload: {offerId: null},
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: {url: `/return`, state: undefined},
        });
      });
  });
});


describe(`Asynchronious actions work correctly (user is unauthentified)`, () => {
  const apiAdapterMock = new ApiAdapterMock(false, false);

  it(`Should make an async call for updating a favorite flag and do nothing if result is an unauthorized error`, () => {
    const action = AsyncActionCreator.setIsFavorite(12, `fake favorite`);
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
      });
  });

  it(`Should make an async call for adding a review and do nothing except calling an error callback if result is an unauthorized error`, () => {
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const action = AsyncActionCreator.postReview(13, {text: `test text`, rating: 3}, {successCallback, errorCallback});
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(successCallback).toHaveBeenCalledTimes(0);
        expect(errorCallback).toHaveBeenCalledTimes(1);
      });
  });

  it(`Should make an async call and update an authorization information`, () => {
    const action = AsyncActionCreator.checkAuthorization();
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_AUTHORIZATION,
          payload: {
            status: `NO_AUTH`,
            authInfo: null
          },
        });
      });
  });
});


describe(`Asynchronious actions work correctly (server returns an error)`, () => {
  const apiAdapterMock = new ApiAdapterMock(true, true);

  it(`Should make an async call fetching cities and offers and display a message in case of error`, () => {
    const action = AsyncActionCreator.fetchHotelsAndCities();
    const dispatch = jest.fn();

    return action(dispatch, () => ({"DATA": {cities: `cities fake data`}}), apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SHOW_MESSAGE,
          payload: {
            text: expect.stringContaining(`_error_`)
          }
        });
      });
  });

  it(`Should make an async call fetching favorites and display a message in case of error`, () => {
    const action = AsyncActionCreator.fetchFavorites();
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SHOW_MESSAGE,
          payload: {
            text: expect.stringContaining(`_error_`)
          }
        });
      });
  });

  it(`Should initialize offer details, make an async call fetching offer details and display a message in case of error`, () => {
    const action = AsyncActionCreator.fetchOfferDetails(15);
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.INIT_OFFER_DETAILS,
          payload: {offerId: 15},
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SHOW_MESSAGE,
          payload: {
            text: expect.stringContaining(`_error_`)
          }
        });
      });
  });

  it(`Should make an async call updating a favorite flag and display a message in case of error`, () => {
    const action = AsyncActionCreator.setIsFavorite(12, `fake favorite`);
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SHOW_MESSAGE,
          payload: {
            text: expect.stringContaining(`_error_`)
          }
        });
      });
  });

  it(`Should make an async call for adding a review and display a message and call an error callback in case of error`, () => {
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const action = AsyncActionCreator.postReview(13, {text: `test text`, rating: 3}, {successCallback, errorCallback});
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SHOW_MESSAGE,
          payload: {
            text: expect.stringContaining(`_error_`)
          }
        });
        expect(successCallback).toHaveBeenCalledTimes(0);
        expect(errorCallback).toHaveBeenCalledTimes(1);
      });
  });

  it(`Should make an async quering an authorization information and display a message in case of error`, () => {
    const action = AsyncActionCreator.checkAuthorization();
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SHOW_MESSAGE,
          payload: {
            text: expect.stringContaining(`_error_`)
          }
        });
      });
  });

  it(`Should make an async login query and display a message in case of error`, () => {
    const action = AsyncActionCreator.login(`test@test.com`, `12345`, `/return`);
    const dispatch = jest.fn();

    return action(dispatch, () => {}, apiAdapterMock)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SHOW_MESSAGE,
          payload: {
            text: expect.stringContaining(`_error_`)
          }
        });
      });
  });
});
