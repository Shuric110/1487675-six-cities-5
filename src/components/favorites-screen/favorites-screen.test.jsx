import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter as Router} from 'react-router-dom';

import {FavoritesScreen} from "./favorites-screen";

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
];

const offers = [
  {
    id: 1,
    city: cities[0],
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
  },

  {
    id: 2,
    city: cities[0],
    pictures: [
      `/img/apartment-01.jpg`,
      `/img/apartment-02.jpg`,
    ],
    placePicture: `/img/studio-01.jpg`,
    coordinates: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198
    },
    mapZoom: 12,
    isPremium: true,
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
      `Washing machine`,
      `Cable TV`,
      `Fridge`
    ],
    host: {
      name: `Angelina`,
      avatar: `/img/avatar-angelina.jpg`,
      isSuper: true
    },
  },

  {
    id: 3,
    city: cities[1],
    pictures: [
      `/img/apartment-03.jpg`,
      `/img/studio-01.jpg`,
      `/img/apartment-01.jpg`,
    ],
    placePicture: `/img/apartment-01.jpg`,
    coordinates: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198
    },
    mapZoom: 12,
    isPremium: false,
    isFavorite: true,
    nightlyCost: 132,
    title: `Canal View Prinsengracht`,
    type: `apartment`,
    rating: 4,
    description: `For travelers visiting Amsterdam, Canal View Prinsengracht is an excellent choice for rest and rejuvenation.
                  Well-known for its family-friendly environment and proximity to great restaurants and attractions, Canal View Prinsengracht makes it easy to enjoy the best of Amsterdam.`,
    bedrooms: 3,
    maxAdults: 5,
    features: [
      `Washing machine`,
      `Towels`,
      `Heating`,
    ],
    host: {
      name: `Max`,
      avatar: `/img/avatar-max.jpg`,
      isSuper: false
    },
  },
];

const favorites = [
  {
    city: cities[0].name,
    offers: [
      offers[0],
      offers[1],
    ]
  },
  {
    city: cities[1].name,
    offers: [
      offers[2],
    ]
  }
];

jest.mock(`../main-header/main-header`, () => `MainHeader`);
jest.mock(`../bookmark-button/bookmark-button`, () => `BookmarkButton`);

describe(`Render FavoritesScreen`, () => {
  it(`FavoritesScreen for non-empty list renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <FavoritesScreen
              favorites={favorites}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`FavoritesScreen for empty list renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <FavoritesScreen
              favorites={[]}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
