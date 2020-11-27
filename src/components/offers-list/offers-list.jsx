import React, {useEffect} from "react";
import PropTypes from "prop-types";

import {offerPropType} from "../../props";
import OfferCard from "../offer-card/offer-card";

const OffersList = (props) => {
  const {listClassName, itemClassName, offers, setActiveOffer, clearActiveOffer} = props;

  useEffect(() => {
    return () => {
      // Действие при размонтировании компонента
      if (clearActiveOffer) {
        clearActiveOffer(null);
      }
    };
  }, []);

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
};

OffersList.propTypes = {
  listClassName: PropTypes.string.isRequired,
  itemClassName: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropType.isRequired).isRequired,
  setActiveOffer: PropTypes.func,
  clearActiveOffer: PropTypes.func,
};

export default OffersList;
