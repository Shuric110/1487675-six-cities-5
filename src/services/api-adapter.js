import moment from "moment";

export default class ApiAdapter {
  constructor(api) {
    this._api = api;
  }

  getOffersAndCities(initialCities) {
    return this._api.getHotels()
      .then(
          (hotels) => ApiAdapter.convertRemoteHotelsToLocalOffersAndCities(hotels, initialCities)
      );
  }

  checkAuthorization() {
    return this._api.checkAuthorization()
      .then(
          (authInfo) => authInfo ? ApiAdapter.convertRemoteAuthInfoToLocal(authInfo) : null
      );
  }

  login(email, password) {
    return this._api.login(email, password)
      .then(
          (authInfo) => authInfo ? ApiAdapter.convertRemoteAuthInfoToLocal(authInfo) : null
      );
  }

  getOfferById(id) {
    return this._api.getHotelById(id)
      .then(
          (hotel) => ApiAdapter.convertRemoteHotelToLocalOffer(hotel)
      );
  }

  getNearestOffersById(id) {
    return this._api.getNearbyHotelsById(id)
      .then(
          (hotels) => hotels.map((hotel) => ApiAdapter.convertRemoteHotelToLocalOffer(hotel))
      );
  }

  getReviewsByOfferId(id) {
    return this._api.getCommentsByHotelId(id)
      .then(
          (comments) => comments.map((comment) => ApiAdapter.convertRemoteCommentToLocalReview(comment))
      );
  }

  postReview(offerId, text, rating) {
    return this._api.postComment(offerId, text, rating)
      .then(
          (comments) => comments.map((comment) => ApiAdapter.convertRemoteCommentToLocalReview(comment))
      );
  }

  setFavorite(offerId, isFavorite) {
    return this._api.setFavorite(offerId, isFavorite ? 1 : 0)
      .then(
          (hotel) => ApiAdapter.convertRemoteHotelToLocalOffer(hotel)
      );
  }


  static convertRemoteCommentToLocalReview(comment) {
    return {
      id: comment.id,
      authorAvatar: comment.user.avatar_url,
      authorName: comment.user.name,
      rating: comment.rating,
      date: moment(comment.date).toDate(),
      text: comment.comment
    };
  }

  static convertRemoteHotelsToLocalOffersAndCities(hotels, initialCities) {
    const offers = hotels.map((hotel) => ApiAdapter.convertRemoteHotelToLocalOffer(hotel));
    const cities = initialCities.slice();

    // Построение индекса городов по имени
    const citiesIndexesByName = {};
    cities.forEach(({name}, idx) => {
      citiesIndexesByName[name] = idx;
    });

    // Обновим информацию о городах из информации об отелях
    offers.forEach(({city}) => {
      const cityIndex = citiesIndexesByName[city.name];
      const oldCity = cities[cityIndex];
      city.id = oldCity.id;
      cities[cityIndex] = city;
    });

    // Обновим отели: проставим им правильные города
    offers.forEach((offer) => {
      const cityIndex = citiesIndexesByName[offer.city.name];
      offer.city = cities[cityIndex];
    });

    return {offers, cities};
  }

  static convertRemoteHotelToLocalOffer(remoteHotel) {
    const city = {
      id: null,
      name: remoteHotel.city.name,
      coordinates: {
        latitude: remoteHotel.city.location.latitude,
        longitude: remoteHotel.city.location.longitude
      },
      zoom: remoteHotel.city.location.zoom,
    };

    return {
      id: remoteHotel.id,
      city,
      pictures: remoteHotel.images,
      placePicture: remoteHotel.preview_image,
      coordinates: {
        latitude: remoteHotel.location.latitude,
        longitude: remoteHotel.location.longitude
      },
      mapZoom: remoteHotel.location.zoom,
      isPremium: remoteHotel.is_premium,
      isFavorite: remoteHotel.is_favorite,
      nightlyCost: remoteHotel.price,
      title: remoteHotel.title,
      type: remoteHotel.type,
      rating: remoteHotel.rating,
      description: remoteHotel.description,
      bedrooms: remoteHotel.bedrooms,
      maxAdults: remoteHotel.max_adults,
      features: remoteHotel.goods,
      host: {
        id: remoteHotel.host.id,
        name: remoteHotel.host.name,
        avatar: remoteHotel.host.avatar_url,
        isSuper: remoteHotel.host.is_pro
      },
    };
  }

  static convertRemoteAuthInfoToLocal(remoteAuthInfo) {
    return {
      id: remoteAuthInfo.id,
      avatar: remoteAuthInfo.avatar_url,
      email: remoteAuthInfo.email,
      isPro: remoteAuthInfo.is_pro,
      name: remoteAuthInfo.name
    };
  }
}
