import React from "react";
import renderer from "react-test-renderer";
import {BookmarkButton} from "./bookmark-button";

const noop = () => {};

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

const offerWithoutFavoriteFlag = Object.assign({}, offerWithFavoriteFlag, {isFavorite: false});

describe(`Render BookmarkButton`, () => {
  it(`BookmarkButton for favorite order renders correctly`, () => {
    const tree = renderer
      .create(
          <BookmarkButton
            baseClassName="class1"
            offer={offerWithFavoriteFlag}
            setIsFavorite={noop}
          >
            <div className="test1">test1</div>
          </BookmarkButton>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`BookmarkButton for not favorite order renders correctly`, () => {
    const tree = renderer
      .create(
          <BookmarkButton
            baseClassName="class2"
            offer={offerWithoutFavoriteFlag}
            setIsFavorite={noop}
          >
            <div className="test2">test2</div>
            <div className="test3">test3</div>
          </BookmarkButton>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });


});
