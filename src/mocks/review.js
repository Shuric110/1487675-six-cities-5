import {randomInteger} from "../util.js";
import moment from "moment";

const REVIEW_PIECES = [
  `We enjoyed our stay in the hotel. It was a very cozy atmosphere.`,
  `The breakfast room and reception area were nicely and thoughtful decorated and everyone was very friendly and helpful.`,
  `Our room was small but modern and clean and there is free WiFi everywhere.`,
  `Also there are some nice little boutiques and hip shops around.`,
  `We hired DB city bikes to get around. There is a bike station a few blocks away from the hotel.`,
  `Breakfast could do with more variety especially cold meats and cheeses plus cereals.`,
  `Location close to rail and bus stations and about 15 minute walk into the centre of the old part of the city.`,
  `The staff are lovely and have some great recommendations for where to eat and visit.`,
  `My experience here was awful.`,
  `They had roaches everywhere.`,
  `There were roaches in the closet, several crawling the wall, several came from behind the mirror, and to top it off, found some dead ones in the refrigerator.`,
  `The most disgusting experience ever.`,
  `The room was tiny and stank, as did the rest of the building.`,
  `No air conditioning, so lots of street noise with window open for much needed fresh air. Rooms smell dusty.`,
  `The 5-star sign out front is surely a feeble attempt at a joke!`,
];

const REVIEW_AUTHORS = [
  {
    name: `Angelina`,
    avatar: `/img/avatar-angelina.jpg`,
  },
  {
    name: `Max`,
    avatar: `/img/avatar-max.jpg`,
  }
];

const MAX_REVIEWS = 2;
const REVIEW_LENGTH = 3;
const REVIEW_DATE_MIN_AGE = 20;
const REVIEW_DATE_MAX_AGE = 120;

const makeReview = (authors) => {
  const reviewPieces = REVIEW_PIECES.slice();
  let text = ``;

  for (let i = 0; i < REVIEW_LENGTH; i++) {
    const pieceIndex = randomInteger(0, reviewPieces.length - 1);
    text += reviewPieces.splice(pieceIndex, 1)[0] + ` `;
  }

  const authorIndex = randomInteger(0, authors.length - 1);
  const author = authors.splice(authorIndex, 1)[0];

  return {
    authorAvatar: author.avatar,
    authorName: author.name,
    rating: randomInteger(1, 5),
    date: moment().startOf(`day`).subtract(randomInteger(REVIEW_DATE_MIN_AGE, REVIEW_DATE_MAX_AGE), `days`).toDate(),
    text
  };
};

export const makeReviews = () => {
  const authors = REVIEW_AUTHORS.slice();
  const reviewsCount = randomInteger(0, MAX_REVIEWS);
  const reviews = [];

  for (let i = 0; i < reviewsCount; i++) {
    reviews.push(makeReview(authors));
  }

  return reviews;
};
