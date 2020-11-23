import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import BasicOffersList from "../offers-list/offers-list";
import GeoMap from "../geo-map/geo-map";
import CitiesMenu from "../cities-menu/cities-menu";
import SortSelect from "../sort-select/sort-select";
import OffersEmpty from "../offers-empty/offers-empty";
import withActiveOffer from "../../hocs/with-active-offer/with-active-offer";

import {offerPropType, cityPropType} from "../../props";
import {filterOffers} from "../../offers";

const OffersList = withActiveOffer(BasicOffersList);

const MainScreen = (props) => {
  const {offers, currentCity} = props;
  const {name: cityName, coordinates: cityCoordinates} = currentCity;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${offers.length === 0 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesMenu />
        <div className="cities">
          {offers.length > 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {cityName}</b>
                <SortSelect />

                <OffersList
                  listClassName="cities__places-list"
                  itemClassName="cities__place-card"
                  offers={offers}
                />

              </section>
              <div className="cities__right-section">
                <GeoMap
                  className="cities__map"
                  mapCenter={cityCoordinates}
                  offers={offers}
                />
              </div>
            </div>
          ) : (
            <OffersEmpty />
          )}
        </div>
      </main>
    </div>
  );
};

MainScreen.propTypes = {
  offers: PropTypes.arrayOf(offerPropType.isRequired).isRequired,
  currentCity: cityPropType,
};

const mapStateToProps = (state) => ({
  offers: filterOffers(state.offers, {city: state.currentCity}),
  currentCity: state.currentCity,
});

export {MainScreen};
export default connect(mapStateToProps)(MainScreen);
