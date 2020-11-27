import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MainHeader from "../main-header/main-header";
import BasicOffersList from "../offers-list/offers-list";
import GeoMap from "../geo-map/geo-map";
import CitiesMenu from "../cities-menu/cities-menu";
import SortSelect from "../sort-select/sort-select";
import OffersEmpty from "../offers-empty/offers-empty";
import withActiveOffer from "../../hocs/with-active-offer/with-active-offer";
import withAllOffers from "../../hocs/with-all-offers/with-all-offers";

import {getFilteredOffers} from "../../store/selectors";
import {offerPropType, cityPropType} from "../../props";

const OffersList = withActiveOffer(withAllOffers(BasicOffersList));

const MainScreen = (props) => {
  const {offers, currentCity} = props;
  const {name: cityName, coordinates: cityCoordinates, zoom} = currentCity;

  return (
    <div className="page page--gray page--main">
      <MainHeader
        isMainPage={true}
      />

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
                />

              </section>
              <div className="cities__right-section">
                <GeoMap
                  className="cities__map"
                  mapCenter={cityCoordinates}
                  zoom={zoom}
                  offers={offers}
                />
              </div>
            </div>
          ) : (
            <OffersEmpty>{cityName}</OffersEmpty>
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
  offers: getFilteredOffers(state),
  currentCity: state.APP.currentCity,
});

export {MainScreen};
export default connect(mapStateToProps)(MainScreen);
