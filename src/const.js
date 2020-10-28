export const OfferType = {
  APARTMENT: `APARTMENT`,
  ROOM: `ROOM`,
  HOUSE: `HOUSE`,
  HOTEL: `HOTEL`
};

export const OFFER_TYPE_TITLES = {
  [OfferType.APARTMENT]: `Apartment`,
  [OfferType.ROOM]: `Private Room`,
  [OfferType.HOUSE]: `House`,
  [OfferType.HOTEL]: `Hotel`,
};

export const mapOfferIcon = {
  url: `img/pin.svg`,
  width: 27,
  height: 39,
  anchorLeft: 14,
  anchorTop: 38
};

export const mapDefaultZoom = 12;

export const mapDefaultCenter = {
  latitude: 52.38333,
  longitude: 4.9
};
