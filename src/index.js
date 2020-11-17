import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from "./components/app/app";
import reducer from "./store/root-reducer";

import {CITIES, DEFAULT_CITY} from "./static";
import {ActionCreator} from "./store/action";

import OFFERS from "./mocks/offers";
import FAVORITES from "./mocks/favorites";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

store.dispatch(ActionCreator.initOffers(OFFERS));
store.dispatch(ActionCreator.initFavorites(FAVORITES));
store.dispatch(ActionCreator.initCities(CITIES));
store.dispatch(ActionCreator.setCurrentCity(DEFAULT_CITY));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
