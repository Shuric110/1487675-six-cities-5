import React from "react";
import renderer from "react-test-renderer";
import {CitiesMenu} from "./cities-menu";

const noop = () => {};

const cities = [
  {
    id: 1,
    name: `Paris`,
    coordinates: {
      latitude: 48.8606146,
      longitude: 2.3354553
    },
    zoom: 12,
  },
  {
    id: 2,
    name: `Amsterdam`,
    coordinates: {
      latitude: 48.8606146,
      longitude: 2.3354553
    },
    zoom: 12,
  },
  {
    id: 3,
    name: `Brussels`,
    coordinates: {
      latitude: 48.8606146,
      longitude: 2.3354553
    },
    zoom: 12,
  },
];

const currentCity = cities[1];

describe(`Render CitiesMenu`, () => {
  it(`CitiesMenu renders correctly`, () => {
    const tree = renderer
      .create(
          <CitiesMenu
            cities={cities}
            currentCity={currentCity}
            setCurrentCity={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
