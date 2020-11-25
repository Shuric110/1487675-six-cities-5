import MockAdapter from "axios-mock-adapter";
import Api from "./api";

describe(`API works correctly`, () => {
  it(`Should make a correct call to get hotels`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    apiHttpMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return api.getHotels()
      .then((response) => {
        expect(response).toEqual([{fake: true}]);
      });
  });

  it(`Should make a correct call to get one hotel`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    apiHttpMock
      .onGet(`/hotels/33`)
      .reply(200, {fake: true});

    return api.getHotelById(33)
      .then((response) => {
        expect(response).toEqual({fake: true});
      });
  });

  it(`Should make a correct call to get nearby hotels`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    apiHttpMock
      .onGet(`/hotels/35/nearby`)
      .reply(200, [{fake: true}]);

    return api.getNearbyHotelsById(35)
      .then((response) => {
        expect(response).toEqual([{fake: true}]);
      });
  });

  it(`Should make a correct call to get hotel comments`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    apiHttpMock
      .onGet(`/comments/34`)
      .reply(200, [{fake: true}]);

    return api.getCommentsByHotelId(34)
      .then((response) => {
        expect(response).toEqual([{fake: true}]);
      });
  });

  it(`Should make a correct call to get favorites`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    apiHttpMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return api.getFavorites()
      .then((response) => {
        expect(response).toEqual([{fake: true}]);
      });
  });

  it(`Should make a correct call to post a comment`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    apiHttpMock
      .onPost(`/comments/44`, {
        comment: `fake comment`,
        rating: 4
      })
      .reply(200, [{fake: true}]);

    return api.postComment(44, `fake comment`, 4)
      .then((response) => {
        expect(response).toEqual([{fake: true}]);
      });
  });

  it(`Should make a correct call to set a favorite flag`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    apiHttpMock
      .onPost(`/favorite/45/1`)
      .reply(200, {fake: true});

    return api.setFavorite(45, 1)
      .then((response) => {
        expect(response).toEqual({fake: true});
      });
  });

  it(`Should make a correct call to check an authorization`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    apiHttpMock
      .onGet(`/login`)
      .reply(200, {fake: true});

    return api.checkAuthorization()
      .then((response) => {
        expect(response).toEqual({fake: true});
      });
  });

  it(`Should make a correct call to login`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    apiHttpMock
      .onPost(`/login`, {
        email: `fake@email.com`,
        password: `qwerty`
      })
      .reply(200, {fake: true});

    return api.login(`fake@email.com`, `qwerty`)
      .then((response) => {
        expect(response).toEqual({fake: true});
      });
  });

  // Error handling (common)

  it(`Should make a correct call to login and resolve as an error and call an unauthorized callback on authorization error`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    const unauthorized = jest.fn();
    api.setOnUnauthorized(unauthorized);

    apiHttpMock
      .onPost(`/login`, {
        email: `fake@email.com`,
        password: `qwerty`
      })
      .reply(401, {fake: true});

    expect.assertions(2);

    return api.login(`fake@email.com`, `qwerty`)
      .catch((response) => {
        expect(response.response.data).toEqual({fake: true});
      })
      .then(() => {
        expect(unauthorized).toHaveBeenCalledTimes(1);
      });
  });

  it(`Should make a correct call to login and resolve as an error and don't call an unauthorized callback on server error`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    const unauthorized = jest.fn();
    api.setOnUnauthorized(unauthorized);

    apiHttpMock
      .onPost(`/login`, {
        email: `fake@email.com`,
        password: `qwerty`
      })
      .reply(400, {fake: true});

    expect.assertions(2);

    return api.login(`fake@email.com`, `qwerty`)
      .catch((response) => {
        expect(response.response.data).toEqual({fake: true});
      })
      .then(() => {
        expect(unauthorized).toHaveBeenCalledTimes(0);
      });
  });

  // Unauthorized when getting auth info

  it(`Should make a correct call to check authorization and resove as null and don't call an unauthorized callback on authorization error`, () => {
    const api = new Api();
    const apiHttpMock = new MockAdapter(api.getHttpApi());

    const unauthorized = jest.fn();
    api.setOnUnauthorized(unauthorized);

    apiHttpMock
      .onGet(`/login`)
      .reply(401, {fake: true});

    return api.checkAuthorization()
      .then((response) => {
        expect(response).toEqual(null);
        expect(unauthorized).toHaveBeenCalledTimes(0);
      });
  });

});
