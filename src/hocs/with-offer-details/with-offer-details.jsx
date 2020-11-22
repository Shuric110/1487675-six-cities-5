import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {extend} from "../../util";

const initialState = {
  offerId: null,
  offer: null,
  nearestOffers: null,
  reviews: null
};

const mapStateToProps = (state) => ({
  api: state.DATA.api,
});

const withOfferDetails = (Component) => {
  class WithOfferDetails extends PureComponent {
    constructor(props) {
      super(props);

      this.state = initialState;

      this.setReviews = this.setReviews.bind(this);
      this.updateFavoriteOffer = this.updateFavoriteOffer.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
      // Очистка загруженных данных при смене входного offerId
      if (props.offerId !== state.offerId) {
        return initialState;
      }

      return null;
    }

    componentDidMount() {
      this._loadData(this.props.offerId);
    }

    componentDidUpdate(prevProps) {
      if (this.props.offerId !== prevProps.offerId) {
        this._loadData(this.props.offerId);
      }
    }

    _loadData(offerId) {
      Promise.all([
        this.props.api.getOfferById(offerId),
        this.props.api.getNearestOffersById(offerId),
        this.props.api.getReviewsByOfferId(offerId),
      ])
      .then(([offer, nearestOffers, reviews]) => {
        this.setState(
            (_state, props) =>
              (props.offerId === offerId ? {offerId, offer, nearestOffers, reviews} : null)
        );
      });
    }

    updateFavoriteOffer(id, isFavorite) {
      this.setState((state) => {
        const {offer, nearestOffers} = state;
        const newState = {};

        if (offer && offer.id === id) {
          newState.offer = extend(offer, {isFavorite});
        }

        if (nearestOffers) {
          newState.nearestOffers = nearestOffers.map(
              (nearOffer) => nearOffer.id !== id ? nearOffer : extend(nearOffer, {isFavorite})
          );
        }

        return newState;
      });
    }

    setReviews(offerId, reviews) {
      this.setState((state) => state.offerId === offerId ? {reviews} : null);
    }

    render() {
      const {offer, nearestOffers, reviews} = this.state;

      return <Component
        {...this.props}
        offer={offer}
        nearestOffers={nearestOffers}
        reviews={reviews}
        setReviews={this.setReviews}
        updateFavoriteOffer={this.updateFavoriteOffer}
      />;
    }
  }

  WithOfferDetails.propTypes = {
    offerId: PropTypes.number.isRequired,
    api: PropTypes.object.isRequired,
  };

  return connect(mapStateToProps)(WithOfferDetails);
};

export default withOfferDetails;
