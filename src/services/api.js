import axios from "axios";

const BACKEND_URL = `https://5.react.pages.academy/six-cities`;
const REQUEST_TIMEOUT = 5000;

export const HttpCode = {
  UNAUTHORIZED: 401
};

const APIRoute = {
  HOTELS: `/hotels`,
  HOTELS_NEARBY: `/nearby`,
  FAVORITE: `/favorite`,
  COMMENTS: `/comments`,
  LOGIN: `/login`,
};

export default class Api {
  constructor() {
    this._httpClient = axios.create({
      baseURL: BACKEND_URL,
      timeout: REQUEST_TIMEOUT,
      withCredentials: true,
    });

    this._handleFailure = this._handleFailure.bind(this);
    this._handleSuccess = this._handleSuccess.bind(this);

    this._httpClient.interceptors.response.use(this._handleSuccess, this._handleFailure);

    this._onUnauthorized = null;
  }

  _handleSuccess(response) {
    return response.data;
  }

  _handleFailure(err) {
    const {response} = err;

    if (response && response.status === HttpCode.UNAUTHORIZED) {
      if (!err.response.config.__isCheckAuthorization && this._onUnauthorized) {
        this._onUnauthorized();
      }

      throw err;
    }

    throw err;
  }

  getHttpApi() {
    return this._httpClient;
  }

  setOnUnauthorized(onUnauthorized) {
    this._onUnauthorized = onUnauthorized;
  }

  getHotels() {
    return this._httpClient.get(APIRoute.HOTELS);
  }

  getHotelById(id) {
    return this._httpClient.get(`${APIRoute.HOTELS}/${id}`);
  }

  getNearbyHotelsById(id) {
    return this._httpClient.get(`${APIRoute.HOTELS}/${id}${APIRoute.HOTELS_NEARBY}`);
  }

  getCommentsByHotelId(id) {
    return this._httpClient.get(`${APIRoute.COMMENTS}/${id}`);
  }

  getFavorites() {
    return this._httpClient.get(APIRoute.FAVORITE);
  }

  postComment(hotelId, comment, rating) {
    return this._httpClient.post(`${APIRoute.COMMENTS}/${hotelId}`, {comment, rating});
  }

  setFavorite(hotelId, status) {
    return this._httpClient.post(`${APIRoute.FAVORITE}/${hotelId}/${status}`);
  }

  checkAuthorization() {
    return this._httpClient.get(APIRoute.LOGIN, {__isCheckAuthorization: true})
      .catch((err) => {
        if (err.response.status === HttpCode.UNAUTHORIZED) {
          return null;
        }
        throw err;
      });
  }

  login(email, password) {
    return this._httpClient.post(APIRoute.LOGIN, {email, password});
  }
}
