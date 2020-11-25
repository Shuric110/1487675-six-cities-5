import React from "react";
import renderer from "react-test-renderer";

import ReviewsList from "./reviews-list";

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

jest.mock(`../review-form/review-form`, () => `ReviewForm`);

describe(`Render ReviewsList`, () => {
  it(`ReviewsList with review form renders correctly`, () => {
    const tree = renderer
      .create(
          <ReviewsList
            reviews={reviews}
            offerId={0}
            displayReviewForm={true}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`ReviewsList without review form renders correctly`, () => {
    const tree = renderer
      .create(
          <ReviewsList
            reviews={reviews}
            offerId={0}
            displayReviewForm={false}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
