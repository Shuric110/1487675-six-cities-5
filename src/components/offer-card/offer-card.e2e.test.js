import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OfferCard from "./offer-card";

Enzyme.configure({
  adapter: new Adapter(),
});

const offer = {
  id: 1,
  city: {
    id: 1,
    name: `Paris`,
    coordinates: {
      latitude: 48.8606146,
      longitude: 2.3354553
    },
    zoom: 12,
  },
  pictures: [
    `/img/room.jpg`,
  ],
  placePicture: `/img/room.jpg`,
  coordinates: {
    latitude: 52.369553943508,
    longitude: 4.85309666406198
  },
  mapZoom: 12,
  isPremium: false,
  isFavorite: true,
  nightlyCost: 80,
  title: `Wood and stone place`,
  type: `room`,
  rating: 4.2,
  description: `Excellent choice for travelers, offering many helpful amenities designed to enhance your stay.`,
  bedrooms: 1,
  maxAdults: 2,
  features: [
    `Wi-Fi`,
  ],
  host: {
    name: `Angelina`,
    avatar: `/img/avatar-angelina.jpg`,
    isSuper: true
  },
};

describe(`OfferCard calls mouse event callbacks`, () => {
  it(`onHover is called`, () => {
    const onHover = jest.fn();
    const onUnHover = jest.fn();

    const wrapper = shallow(
        <OfferCard
          itemClassName="class1"
          offer={offer}
          onHover={onHover}
          onUnHover={onUnHover}
        />
    );

    wrapper.simulate(`mouseenter`);

    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onUnHover).toHaveBeenCalledTimes(0);
  });

  it(`onUnHover is called`, () => {
    const onHover = jest.fn();
    const onUnHover = jest.fn();

    const wrapper = shallow(
        <OfferCard
          itemClassName="class1"
          offer={offer}
          onHover={onHover}
          onUnHover={onUnHover}
        />
    );

    wrapper.simulate(`mouseleave`);

    expect(onHover).toHaveBeenCalledTimes(0);
    expect(onUnHover).toHaveBeenCalledTimes(1);
  });
});
