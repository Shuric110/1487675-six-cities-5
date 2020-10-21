import PropTypes from "prop-types";
import {OfferType} from "./const.js";

export const reviewPropType = PropTypes.shape({
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired,
});

export const offerPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
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
  reviews: PropTypes.arrayOf(reviewPropType.isRequired).isRequired,
});

export const favoritePropType = PropTypes.shape({
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropType.isRequired).isRequired,
});
