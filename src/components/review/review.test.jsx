import React from "react";
import renderer from "react-test-renderer";

import Review from "./review";

const reviews = [
  {
    id: 1,
    authorAvatar: `/img/avatar-angelina.jpg`,
    authorName: `Angelina`,
    rating: 4,
    date: new Date(`2020-10-17T03:24:00`),
    text: `We enjoyed our stay in the hotel. It was a very cozy atmosphere.`,
  },
  {
    id: 2,
    authorAvatar: `/img/avatar-max.jpg`,
    authorName: `Max`,
    rating: 1,
    date: new Date(`2019-11-19T02:54:10`),
    text: `There were roaches in the closet, several crawling the wall, several came from behind the mirror, and to top it off, found some dead ones in the refrigerator.`,
  },
];

describe(`Render Review`, () => {
  it(`Review for review variant 1 renders correctly`, () => {
    const tree = renderer
      .create(
          <Review
            review={reviews[0]}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Review for review variant 2 renders correctly`, () => {
    const tree = renderer
      .create(
          <Review
            review={reviews[1]}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
