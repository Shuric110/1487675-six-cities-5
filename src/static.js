const DEFAULT_CITY_INDEX = 0;

export const CITIES = [
  {
    id: 1,
    name: `Paris`,
    coordinates: {
      latitude: 48.8606146,
      longitude: 2.3354553
    }
  },
  {
    id: 2,
    name: `Cologne`,
    coordinates: {
      latitude: 50.937976,
      longitude: 6.958323
    }
  },
  {
    id: 3,
    name: `Brussels`,
    coordinates: {
      latitude: 50.8387874,
      longitude: 4.2933657
    }
  },
  {
    id: 4,
    name: `Amsterdam`,
    coordinates: {
      latitude: 52.38333,
      longitude: 4.9
    }
  },
  {
    id: 5,
    name: `Hamburg`,
    coordinates: {
      latitude: 53.551003,
      longitude: 9.992090
    }
  },
  {
    id: 6,
    name: `Dusseldorf`,
    coordinates: {
      latitude: 51.226090,
      longitude: 6.781067
    }
  },
];

export const DEFAULT_CITY = CITIES[DEFAULT_CITY_INDEX];
