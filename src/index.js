import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";

import OFFERS from "./mocks/offers.js";
import FAVORITES from "./mocks/favorites.js";

const Settings = {
  OFFERS_COUNT: 312
};

ReactDOM.render(
    <App
      offersCount={Settings.OFFERS_COUNT}
      offers={OFFERS}
      favorites={FAVORITES}
    />,
    document.querySelector(`#root`)
);
