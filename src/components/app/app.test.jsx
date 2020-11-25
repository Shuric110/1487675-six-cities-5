import React from "react";
import renderer from "react-test-renderer";
import App from "./app";

jest.mock(`../main-screen/main-screen`, () => `MainScreen`);

describe(`Render App`, () => {
  it(`App for root path renders correctly`, () => {
    const tree = renderer
      .create(
          <App />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
