import React from "react";
import PropTypes from "prop-types";
import {Router as BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import MainScreen from "../main-screen/main-screen";
import AuthScreen from "../auth-screen/auth-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import OfferScreen from "../offer-screen/offer-screen";
import PrivateRoute from "../private-route/private-route";

import browserHistory from "../../browser-history";
import {AppRoute} from "../../const";
import {offerPropType} from "../../props";

const App = (props) => {
  const {offers} = props;

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainScreen />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <AuthScreen />
        </Route>
        <PrivateRoute exact path={AppRoute.FAVORITES}>
          <FavoritesScreen />
        </PrivateRoute>
        <Route exact path={AppRoute.OFFER}
          render={(routeProps) => {
            const offerId = +routeProps.match.params.id;
            const offer = offers.find(({id}) => (id === offerId));

            return (
              <OfferScreen
                offer={offer}
                nearestOffers={offers.slice(0, 3)}
              />
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(offerPropType.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.DATA.offers,
});

export {App};
export default connect(mapStateToProps)(App);
