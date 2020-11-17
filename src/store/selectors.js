import {createSelector} from "reselect";

import {filterOffers, sortOffers} from "../offers";

const getOffers = (state) => state.DATA.offers;
const getCurrentCity = (state) => state.APP.currentCity;
const getSortType = (state) => state.APP.sortType;

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
