import {SORT_DEFINITIONS} from "./const";

export const filterOffers = (offers, {city}) =>
  offers
    .filter(({city: itemCity}) => itemCity.id === city.id);

export const sortOffers = (offers, sortType) => {
  const {compare} = SORT_DEFINITIONS[sortType];
  const result = offers.slice();

  if (!compare) {
    return result;
  }

  return result.sort(compare);
};
