import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter as Router} from 'react-router-dom';
import {PrivateRoute} from "./private-route";

describe(`Render PrivateRoute`, () => {
  it(`PrivateRoute for authenticated user with children renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <PrivateRoute
              authorizationStatus="AUTH"
              path="/"
            >
              Inner content in children
            </PrivateRoute>
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`PrivateRoute for authenticated user with render prop renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <PrivateRoute
              authorizationStatus="AUTH"
              path="/"
              render={() => <React.Fragment>Inner content in render prop</React.Fragment>}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`PrivateRoute for unauthenticated user renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <PrivateRoute
              authorizationStatus="NO_AUTH"
              path="/"
            >
              Inner content
            </PrivateRoute>
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
