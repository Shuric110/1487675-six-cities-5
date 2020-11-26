import {INITIAL_CITIES as CITIES} from "../static";
import {makeReviews} from "./review";
import {OfferType} from "../const";

export default [
  {
    id: 1,
    city: CITIES[3],
    pictures: [
      `/img/apartment-01.jpg`,
      `/img/room.jpg`,
      `/img/apartment-02.jpg`,
      `/img/apartment-03.jpg`,
      `/img/studio-01.jpg`,
      `/img/apartment-01.jpg`,
    ],
    coordinates: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    },
    isPremium: true,
    nightlyCost: 120,
    title: `Beautiful & luxurious studio at great location`,
    type: OfferType.APARTMENT,
    rating: 4.8,
    description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`,
    bedrooms: 3,
    maxAdults: 4,
    features: [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cable TV`,
      `Fridge`
    ],
    host: {
      name: `Angelina`,
      avatar: `/img/avatar-angelina.jpg`,
      isSuper: true
    },
    reviews: makeReviews()
  },

  {
    id: 2,
    city: CITIES[3],
    pictures: [
      `/img/room.jpg`,
      `/img/apartment-01.jpg`,
      `/img/apartment-02.jpg`,
      `/img/apartment-03.jpg`,
      `/img/studio-01.jpg`,
      `/img/apartment-01.jpg`,
    ],
    coordinates: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198
    },
    isPremium: false,
    nightlyCost: 80,
    title: `Wood and stone place`,
    type: OfferType.ROOM,
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
    reviews: makeReviews()
  },

  {
    id: 3,
    city: CITIES[3],
    pictures: [
      `/img/apartment-02.jpg`,
      `/img/apartment-01.jpg`,
      `/img/room.jpg`,
      `/img/apartment-03.jpg`,
      `/img/studio-01.jpg`,
      `/img/apartment-01.jpg`,
    ],
    coordinates: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198
    },
    isPremium: false,
    nightlyCost: 132,
    title: `Canal View Prinsengracht`,
    type: OfferType.APARTMENT,
    rating: 4,
    description: `For travelers visiting Amsterdam, Canal View Prinsengracht is an excellent choice for rest and rejuvenation.
                  Well-known for its family-friendly environment and proximity to great restaurants and attractions, Canal View Prinsengracht makes it easy to enjoy the best of Amsterdam.`,
    bedrooms: 3,
    maxAdults: 5,
    features: [
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Kitchen`,
      `Dishwasher`,
      `Cable TV`,
      `Fridge`
    ],
    host: {
      name: `Max`,
      avatar: `/img/avatar-max.jpg`,
      isSuper: false
    },
    reviews: makeReviews()
  },

  {
    id: 4,
    city: CITIES[3],
    pictures: [
      `/img/apartment-02.jpg`,
      `/img/apartment-01.jpg`,
      `/img/room.jpg`,
      `/img/apartment-03.jpg`,
      `/img/studio-01.jpg`,
      `/img/apartment-01.jpg`,
    ],
    coordinates: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    },
    isPremium: true,
    nightlyCost: 180,
    title: `Nice, cozy, warm big bed apartment`,
    type: OfferType.APARTMENT,
    rating: 5,
    description: `Well located within the famous Canal Belt and a short walk from Dam square, Leidse square, Rembrandt square and many well-known museums.
                  Whether you’re in Amsterdam for business or leisure, it is an excellent choice to explore this lively and vibrant city.`,
    bedrooms: 2,
    maxAdults: 4,
    features: [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cable TV`,
      `Fridge`
    ],
    host: {
      name: `Max`,
      avatar: `/img/avatar-max.jpg`,
      isSuper: false
    },
    reviews: makeReviews()
  },

  {
    id: 5,
    city: CITIES[0],
    pictures: [
      `/img/apartment-02.jpg`,
      `/img/apartment-01.jpg`,
      `/img/room.jpg`,
      `/img/apartment-03.jpg`,
      `/img/studio-01.jpg`,
      `/img/apartment-01.jpg`,
    ],
    coordinates: {
      latitude: 48.880178,
      longitude: 2.324560
    },
    isPremium: true,
    nightlyCost: 180,
    title: `Nice, cozy, warm big bed apartment`,
    type: OfferType.APARTMENT,
    rating: 5,
    description: `Well located within the famous Canal Belt and a short walk from Dam square, Leidse square, Rembrandt square and many well-known museums.
                  Whether you’re in Amsterdam for business or leisure, it is an excellent choice to explore this lively and vibrant city.`,
    bedrooms: 2,
    maxAdults: 4,
    features: [
      `Wi-Fi`,
      `Washing machine`,
      `Towels`,
      `Heating`,
      `Coffee machine`,
      `Baby seat`,
      `Kitchen`,
      `Dishwasher`,
      `Cable TV`,
      `Fridge`
    ],
    host: {
      name: `Max`,
      avatar: `/img/avatar-max.jpg`,
      isSuper: false
    },
    reviews: makeReviews()
  },
];
