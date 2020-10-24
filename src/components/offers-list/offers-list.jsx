import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offerPropType} from "../../props";
import OfferCard from "../offer-card/offer-card";

export default class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: null,
    };

    this.handleOfferHover = this.handleOfferHover.bind(this);
  }

  handleOfferHover(evt) {
    this.setState({activeOffer: evt.currentTarget});
  }

  render() {
    const {listClassName, itemClassName, offers} = this.props;

    return (
      <div className={`${listClassName} places__list tabs__content`}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            itemClassName={itemClassName}
            offer={offer}
            onHover={this.handleOfferHover}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  listClassName: PropTypes.string.isRequired,
  itemClassName: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerPropType.isRequired).isRequired
};
