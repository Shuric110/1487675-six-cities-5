import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import App from "./components/app/app";
import reducer from "./store/root-reducer";

import {INITIAL_CITIES, DEFAULT_INITIAL_CITY} from "./static";
import {ActionCreator} from "./store/action";
import {AsyncActionCreator} from "./store/async-action";

import FAVORITES from "./mocks/favorites";

import Api from "./services/api";
import ApiAdapter from "./services/api-adapter";

const api = new Api();
const apiAdapter = new ApiAdapter(api);


const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(apiAdapter))
    )
);

store.dispatch(ActionCreator.initCities(INITIAL_CITIES));
store.dispatch(ActionCreator.setCurrentCity(DEFAULT_INITIAL_CITY));
store.dispatch(ActionCreator.initFavorites(FAVORITES));

// store.dispatch(ActionCreator.initOffers(OFFERS));

store.dispatch(AsyncActionCreator.fetchHotelsAndCities());


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
