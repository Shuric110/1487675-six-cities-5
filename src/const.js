export const MAX_REVIEWS_DISPLAYED = 10;
export const MIN_REVIEW_TEXT_LENGTH = 50;
export const MAX_REVIEW_TEXT_LENGTH = 300;

export const MESSAGE_SHOW_TIME = 3000; // in ms
export const MESSAGE_FADEOUT_TIME = 1000; // in ms

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
