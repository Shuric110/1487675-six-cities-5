import React from "react";
import {Router as BrowserRouter, Switch, Route} from "react-router-dom";

import MainScreen from "../main-screen/main-screen";
import AuthScreen from "../auth-screen/auth-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import OfferScreen from "../offer-screen/offer-screen";
import PrivateRoute from "../private-route/private-route";

import browserHistory from "../../browser-history";
import {AppRoute} from "../../const";

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.LOGIN}
          render={(routeProps) => {
            const locationState = routeProps.location.state;
            return (
              <AuthScreen
                returnUrl={locationState && locationState.returnUrl ? locationState.returnUrl : null}
              />
            );
          }}
        />
        <PrivateRoute exact path={AppRoute.FAVORITES}>
          <FavoritesScreen />
        </PrivateRoute>
        <Route exact path={AppRoute.OFFER}
          render={(routeProps) => {
            const offerId = +routeProps.match.params.id;

            return (
              <OfferScreen
                offerId={offerId}
              />
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
};

export default App;
