import React from "react";
import renderer from "react-test-renderer";
import {GeoMap} from "./geo-map";


describe(`Render GeoMap`, () => {
  it(`GeoMap renders correctly`, () => {
    const tree = renderer
      .create(
          <GeoMap
            className="class1"
            mapCenter={{latitude: 0, longitude: 0}}
            zoom={10}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
