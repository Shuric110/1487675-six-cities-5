import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter as Router} from 'react-router-dom';

import {OfferScreen} from "./offer-screen";

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

const reviews = [
  {
    id: 1,
    authorAvatar: `/img/avatar-angelina.jpg`,
    authorName: `Angelina`,
    rating: 4,
    date: new Date(`2020-10-17T03:24:00`),
    text: `We enjoyed our stay in the hotel. It was a very cozy atmosphere.`,
  },
  {
    id: 2,
    authorAvatar: `/img/avatar-max.jpg`,
    authorName: `Max`,
    rating: 1,
    date: new Date(`2019-11-19T02:54:10`),
    text: `There were roaches in the closet, several crawling the wall, several came from behind the mirror, and to top it off, found some dead ones in the refrigerator.`,
  },
];

jest.mock(`../main-header/main-header`, () => `MainHeader`);
jest.mock(`../bookmark-button/bookmark-button`, () => `BookmarkButton`);
jest.mock(`../geo-map/geo-map`, () => `GeoMap`);
jest.mock(`../cities-menu/cities-menu`, () => `CitiesMenu`);
jest.mock(`../review-form/review-form`, () => `ReviewForm`);

jest.mock(`../../hocs/with-active-offer/with-active-offer`, () => (Component) => (props) => <Component {...props} setActiveOffer={() => {}} clearActiveOffer={() => {}} />);

describe(`Render OfferScreen`, () => {
  it(`OfferScreen for offer variant 1 for authorized user renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <OfferScreen
              offer={offers[0]}
              nearestOffers={offers}
              reviews={reviews}
              authorizationStatus="AUTH"
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`OfferScreen for offer variant 2 for unauthorized user renders correctly`, () => {
    const tree = renderer
      .create(
          <Router>
            <OfferScreen
              offer={offers[1]}
              nearestOffers={offers}
              reviews={reviews}
              authorizationStatus="NO_AUTH"
            />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
