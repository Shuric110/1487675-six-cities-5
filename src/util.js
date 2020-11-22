import moment from "moment";

const PERCENT_PER_STAR = 20;

export const randomInteger = (minValue, maxValue) => {
  return minValue + Math.floor(Math.random() * (maxValue - minValue + 1));
};

export const ratingToPercent = (rating) => {
  return Math.floor(rating) * PERCENT_PER_STAR;
};

export const formatReviewDate = (date) => {
  return moment(date).format(`MMMM YYYY`);
};

export const formatDateAsISO = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
