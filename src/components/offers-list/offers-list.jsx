import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {offerPropType} from "../../props";
import OfferCard from "../offer-card/offer-card";
import {sortOffers} from "../../offers";

const OffersList = (props) => {
  const {listClassName, itemClassName, offers} = props;

  return (
    <div className={`${listClassName} places__list tabs__content`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          itemClassName={itemClassName}
          offer={offer}
        />
      ))}
    </div>
  );
};

OffersList.propTypes = {
  listClassName: PropTypes.string.isRequired,
  itemClassName: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropType.isRequired).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  offers: sortOffers(ownProps.offers, state.sortType),
});

export {OffersList};
export default connect(mapStateToProps)(OffersList);
