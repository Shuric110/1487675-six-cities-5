import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import MainScreen from "../main-screen/main-screen";
import AuthScreen from "../auth-screen/auth-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import OfferScreen from "../offer-screen/offer-screen";

import {offerPropType, favoritePropType} from "../../props";

const App = (props) => {
  const {offers, favorites} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainScreen />
        </Route>
        <Route exact path="/login">
          <AuthScreen />
        </Route>
        <Route exact path="/favorites">
          <FavoritesScreen
            favorites={favorites}
          />
        </Route>
        <Route exact path="/offer/:id"
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
  favorites: PropTypes.arrayOf(favoritePropType.isRequired).isRequired,
};

export default App;
