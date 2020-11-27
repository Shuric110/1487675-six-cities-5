import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter as Router} from 'react-router-dom';
import {AuthScreen} from "./auth-screen";

jest.mock(`../main-header/main-header`, () => `MainHeader`);

const noop = () => {};

describe(`Render AuthScreen`, () => {
  it(`AuthScreen for non-authenticated user renders correctly`, () => {
    const tree = renderer
      .create(
          <AuthScreen
            authorizationStatus="NO_AUTH"
            onSubmit={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AuthScreen for authenticated user renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <AuthScreen
              authorizationStatus="AUTH"
              onSubmit={noop}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

});
