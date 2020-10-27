import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from "./components/app/app";
import {reducer} from "./store/reducer";

import OFFERS from "./mocks/offers.js";
import FAVORITES from "./mocks/favorites.js";

const Settings = {
  OFFERS_COUNT: 312
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        offersCount={Settings.OFFERS_COUNT}
        offers={OFFERS}
        favorites={FAVORITES}
      />
    </Provider>,
    document.querySelector(`#root`)
);
