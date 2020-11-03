import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {offerPropType} from "../../props";
import OfferCard from "../offer-card/offer-card";
import {sortOffers} from "../../offers";

class OffersList extends PureComponent {
  componentWillUnmount() {
    const {clearActiveOffer} = this.props;
    if (clearActiveOffer) {
      clearActiveOffer(null);
    }
  }

  render() {
    const {listClassName, itemClassName, offers, setActiveOffer, clearActiveOffer} = this.props;

    return (
      <div className={`${listClassName} places__list tabs__content`}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            itemClassName={itemClassName}
            offer={offer}
            onHover={() => setActiveOffer && setActiveOffer(offer)}
            onUnHover={() => clearActiveOffer && clearActiveOffer(offer)}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  listClassName: PropTypes.string.isRequired,
  itemClassName: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropType.isRequired).isRequired,
  setActiveOffer: PropTypes.func,
  clearActiveOffer: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  offers: sortOffers(ownProps.offers, state.sortType),
});

export {OffersList};
export default connect(mapStateToProps)(OffersList);
