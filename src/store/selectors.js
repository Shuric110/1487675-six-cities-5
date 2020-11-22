import {createSelector} from "reselect";

import {filterOffers, sortOffers} from "../offers";
import {MAX_REVIEWS_DISPLAYED} from "../const";

const getOffers = (state) => state.DATA.offers;
const getCurrentCity = (state) => state.APP.currentCity;
const getSortType = (state) => state.APP.sortType;
const getDetailsReviews = (state) => state.DATA.offerDetails.reviews;

export const getFilteredOffers = createSelector(
    getOffers,
    getCurrentCity,
    (offers, city) => filterOffers(offers, {city})
);

export const getSortedFilteredOffers = createSelector(
    getFilteredOffers,
    getSortType,
    (offers, sortType) => sortOffers(offers, sortType)
);

export const getSortedDetailsReviews = createSelector(
    getDetailsReviews,
    (reviews) => reviews === null ? null :
      reviews.slice()
      .sort(
          ({date: dateA}, {date: dateB}) => dateB.getTime() - dateA.getTime()
      )
      .slice(0, MAX_REVIEWS_DISPLAYED)
);
