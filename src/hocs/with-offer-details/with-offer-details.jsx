import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {AsyncActionCreator} from "../../store/async-action";
import {offerPropType, reviewPropType} from "../../props";
import {getSortedDetailsReviews} from "../../store/selectors";

const mapStateToProps = (state) => {
  const {offerId: storeOfferId, offer, nearestOffers} = state.DATA.offerDetails;
  return {
    storeOfferId,
    offer,
    nearestOffers,
    reviews: getSortedDetailsReviews(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchOfferDetails(offerId) {
    dispatch(AsyncActionCreator.fetchOfferDetails(offerId));
  }
});

const withOfferDetails = (Component) => {
  class WithOfferDetails extends PureComponent {
    componentDidMount() {
      if (this.props.offerId !== this.props.storeOfferId) {
        this._loadData();
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.offerId !== prevProps.offerId) {
        this._loadData();
      }
    }

    _loadData() {
      const {offerId, fetchOfferDetails} = this.props;
      fetchOfferDetails(offerId);
    }

    render() {
      const {offer, nearestOffers, reviews} = this.props;

      return <Component
        {...this.props}
        offer={offer}
        nearestOffers={nearestOffers}
        reviews={reviews}
      />;
    }
  }

  WithOfferDetails.propTypes = {
    offerId: PropTypes.number.isRequired,
    storeOfferId: PropTypes.number,
    offer: offerPropType,
    nearestOffers: PropTypes.arrayOf(offerPropType.isRequired),
    reviews: PropTypes.arrayOf(reviewPropType.isRequired),
    fetchOfferDetails: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithOfferDetails);
};

export default withOfferDetails;
