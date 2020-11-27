import React from "react";
import renderer from "react-test-renderer";
import {Messages} from "./messages";

const messages = [
  {
    id: 1,
    text: `Message 1`,
    isFadingOut: true,
  },
  {
    id: 2,
    text: `Message 2`,
    isFadingOut: false,
  },
  {
    id: 3,
    text: `Message 3`,
    isFadingOut: false,
  },
];

describe(`Render Messages`, () => {
  it(`Messages renders correctly`, () => {
    const tree = renderer
      .create(
          <Messages
            messages={messages}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
