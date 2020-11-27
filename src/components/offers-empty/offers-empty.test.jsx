import React from "react";
import renderer from "react-test-renderer";
import OffersEmpty from "./offers-empty";

describe(`Render OffersEmpty`, () => {
  it(`OffersEmpty renders correctly`, () => {
    const tree = renderer
      .create(
          <OffersEmpty>City name here</OffersEmpty>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
