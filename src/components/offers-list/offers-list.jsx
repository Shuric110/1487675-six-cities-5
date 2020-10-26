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
    return (
      <div className="cities__places-list places__list tabs__content">
        {this.props.offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onHover={this.handleOfferHover}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerPropType.isRequired).isRequired
};
