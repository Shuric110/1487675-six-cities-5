import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter as Router} from 'react-router-dom';
import {MainHeader} from "./main-header";

jest.mock(`../messages/messages`, () => `Messages`);

const authInfo = {
  id: 1,
  avatar: `/img/avatar-max.jpg`,
  email: `max@yandex.ru`,
  isPro: false,
  name: `Max`
};

describe(`Render MainHeader`, () => {
  it(`MainHeader for authenticated user on main page renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <MainHeader
              isMainPage={true}
              authorizationStatus="AUTH"
              authorizationInfo={authInfo}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`MainHeader for non-authenticated user on main page renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <MainHeader
              isMainPage={true}
              authorizationStatus="NO_AUTH"
              authorizationInfo={null}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`MainHeader for non-authenticated user on not main page renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <MainHeader
              isMainPage={false}
              authorizationStatus="NO_AUTH"
              authorizationInfo={null}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
