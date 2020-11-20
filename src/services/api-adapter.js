export default class ApiAdapter {
  constructor(api) {
    this._api = api;
  }

  getOffersAndCities(initialCities) {
    return this._api.getHotels()
      .then(
          (response) => ApiAdapter.convertRemoteHotelsToLocalOffersAndCities(response.data, initialCities)
      );
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
}
