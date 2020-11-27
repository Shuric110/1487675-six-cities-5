import React from "react";
import renderer from "react-test-renderer";

import {ReviewForm} from "./review-form";

const state = {
  rating: 4,
  text: `We enjoyed our stay in the hotel. It was a very cozy atmosphere.`,
};

const noop = () => {};

describe(`Render ReviewForm`, () => {
  it(`ReviewForm renders correctly`, () => {
    const tree = renderer
      .create(
          <ReviewForm
            offerId={0}
            postReview={noop}
            setState={noop}
            state={state}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
