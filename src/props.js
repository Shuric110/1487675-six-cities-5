import PropTypes from "prop-types";
import {OfferType} from "./const.js";

export const coordinatesPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
});

export const reviewPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired,
});

export const offerPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  placePicture: PropTypes.string.isRequired,
  coordinates: coordinatesPropType.isRequired,
  mapZoom: PropTypes.number.isRequired,
  isPremium: PropTypes.bool.isRequired,
  nightlyCost: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(OfferType)).isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  bedrooms: PropTypes.number.isRequired,
  maxAdults: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  host: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    isSuper: PropTypes.bool.isRequired,
  }).isRequired,
});

export const favoritePropType = PropTypes.shape({
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropType.isRequired).isRequired,
});

export const cityPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  coordinates: coordinatesPropType.isRequired,
  zoom: PropTypes.number.isRequired,
});

export const authorizationInfoPropType = PropTypes.oneOfType([
  PropTypes.oneOf([null]),
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  })
]);
