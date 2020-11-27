import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter as Router} from 'react-router-dom';

import {MainScreen} from "./main-screen";

const city = {
  id: 1,
  name: `Paris`,
  coordinates: {
    latitude: 48.8606146,
    longitude: 2.3354553
  },
  zoom: 12,
};

const offers = [
  {
    id: 1,
    city,
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
    city,
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
    isPremium: true,
    isFavorite: false,
    nightlyCost: 132,
    title: `Canal View Prinsengracht`,
    type: `apartment`,
    rating: 3,
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

const mockOffers = offers;

jest.mock(`../main-header/main-header`, () => `MainHeader`);
jest.mock(`../bookmark-button/bookmark-button`, () => `BookmarkButton`);
jest.mock(`../geo-map/geo-map`, () => `GeoMap`);
jest.mock(`../cities-menu/cities-menu`, () => `CitiesMenu`);
jest.mock(`../sort-select/sort-select`, () => `SortSelect`);

jest.mock(`../../hocs/with-all-offers/with-all-offers`, () => (Component) => (props) => <Component {...props} offers={mockOffers} />);
jest.mock(`../../hocs/with-active-offer/with-active-offer`, () => (Component) => (props) => <Component {...props} setActiveOffer={() => {}} clearActiveOffer={() => {}} />);


describe(`Render MainScreen`, () => {
  it(`MainScreen for non-empty list renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <MainScreen
              offers={offers}
              currentCity={city}
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
            <MainScreen
              offers={[]}
              currentCity={city}
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
