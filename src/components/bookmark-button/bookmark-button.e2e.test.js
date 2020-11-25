import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BookmarkButton} from "./bookmark-button";

Enzyme.configure({
  adapter: new Adapter(),
});

const offerWithFavoriteFlag =
{
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

const offerWithoutFavoriteFlag = Object.assign({}, offerWithFavoriteFlag, {id: 2, isFavorite: false});

describe(`Favorite flag should be changed on button click`, () => {
  test.each([
    [`Favorite flag should be unset`, offerWithFavoriteFlag, false],
    [`Favorite flag should be set`, offerWithoutFavoriteFlag, true],
  ])(`%s`, (_name, offer, newIsFavorite) => {
    const setIsFavorite = jest.fn();

    const wrapper = shallow(
        <BookmarkButton
          baseClassName="class1"
          offer={offer}
          setIsFavorite={setIsFavorite}
        >
          Button children
        </BookmarkButton>
    );

    wrapper.simulate(`click`);

    expect(setIsFavorite).toHaveBeenCalledTimes(1);
    expect(setIsFavorite).toHaveBeenNthCalledWith(1, offer.id, newIsFavorite);
  });
});
