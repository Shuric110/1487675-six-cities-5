export const OfferType = {
  APARTMENT: `apartment`,
  ROOM: `room`,
  HOUSE: `house`,
  HOTEL: `hotel`
};

export const OFFER_TYPE_TITLES = {
  [OfferType.APARTMENT]: `Apartment`,
  [OfferType.ROOM]: `Private Room`,
  [OfferType.HOUSE]: `House`,
  [OfferType.HOTEL]: `Hotel`,
};

export const SortType = {
  DEFAULT: `DEFAULT`,
  PRICE_ASC: `PRICE_ASC`,
  PRICE_DESC: `PRICE_DESC`,
  RATING_DESC: `RATING_DESC`
};

export const SORT_DEFINITIONS = {
  [SortType.DEFAULT]: {
    title: `Popular`,
    compare: null,
  },
  [SortType.PRICE_ASC]: {
    title: `Price: low to high`,
    compare: ({nightlyCost: nightlyCostA}, {nightlyCost: nightlyCostB}) => (nightlyCostA - nightlyCostB),
  },
  [SortType.PRICE_DESC]: {
    title: `Price: high to low`,
    compare: ({nightlyCost: nightlyCostA}, {nightlyCost: nightlyCostB}) => (nightlyCostB - nightlyCostA),
  },
  [SortType.RATING_DESC]: {
    title: `Top rated first`,
    compare: ({rating: ratingA}, {rating: ratingB}) => (ratingB - ratingA),
  },
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,

  OFFER: `/offer/:id`,
};
