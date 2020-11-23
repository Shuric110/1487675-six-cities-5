import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import App from "./components/app/app";
import reducer from "./store/root-reducer";
import browserHistory from "./browser-history";
import {redirect} from "./store/middleware/redirect";
import {messages} from "./store/middleware/messages";

import {INITIAL_CITIES, DEFAULT_INITIAL_CITY} from "./static";
import {ActionCreator} from "./store/action";
import {AsyncActionCreator} from "./store/async-action";
import {AppRoute} from "./const";

import Api from "./services/api";
import ApiAdapter from "./services/api-adapter";

const api = new Api();
const apiAdapter = new ApiAdapter(api);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(apiAdapter)),
        applyMiddleware(redirect),
        applyMiddleware(messages)
    )
);

api.setOnUnauthorized(() => {
  store.dispatch(ActionCreator.redirectToRoute(AppRoute.LOGIN, {returnUrl: browserHistory.location.pathname}));
});

store.dispatch(ActionCreator.initCities(INITIAL_CITIES));
store.dispatch(ActionCreator.setCurrentCity(DEFAULT_INITIAL_CITY));


Promise.all([
  store.dispatch(AsyncActionCreator.fetchHotelsAndCities()),
  store.dispatch(AsyncActionCreator.checkAuthorization())
])
.then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
});
