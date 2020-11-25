import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CitiesMenu} from "./cities-menu";

Enzyme.configure({
  adapter: new Adapter(),
});

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

it(`Current city should be set on menu click`, () => {
  const setCurrentCity = jest.fn();

  const wrapper = shallow(
      <CitiesMenu
        cities={cities}
        currentCity={cities[1]}
        setCurrentCity={setCurrentCity}
      />
  );

  wrapper.find(`.locations__item a`).at(2).simulate(`click`);

  expect(setCurrentCity).toHaveBeenCalledTimes(1);
  expect(setCurrentCity).toHaveBeenNthCalledWith(1, cities[2]);
});
