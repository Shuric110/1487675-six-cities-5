export const filterOffers = (offers, {city}) =>
  offers
    .filter(({city: itemCity}) => itemCity.id === city.id);
