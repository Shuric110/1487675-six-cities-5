const DEFAULT_INITIAL_CITY_INDEX = 0;

export const INITIAL_CITIES = [
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
    name: `Cologne`,
    coordinates: {
      latitude: 50.937976,
      longitude: 6.958323
    },
    zoom: 12,
  },
  {
    id: 3,
    name: `Brussels`,
    coordinates: {
      latitude: 50.8387874,
      longitude: 4.2933657
    },
    zoom: 12,
  },
  {
    id: 4,
    name: `Amsterdam`,
    coordinates: {
      latitude: 52.38333,
      longitude: 4.9
    },
    zoom: 12,
  },
  {
    id: 5,
    name: `Hamburg`,
    coordinates: {
      latitude: 53.551003,
      longitude: 9.992090
    },
    zoom: 12,
  },
  {
    id: 6,
    name: `Dusseldorf`,
    coordinates: {
      latitude: 51.226090,
      longitude: 6.781067
    },
    zoom: 12,
  },
];

export const DEFAULT_INITIAL_CITY = INITIAL_CITIES[DEFAULT_INITIAL_CITY_INDEX];
