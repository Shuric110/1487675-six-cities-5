import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import ReviewsList from "../reviews-list/reviews-list";
import GeoMap from "../geo-map/geo-map";
import BasicOffersList from "../offers-list/offers-list";
import MainHeader from "../main-header/main-header";
import BookmarkButton from "../bookmark-button/bookmark-button";
import withActiveOffer from "../../hocs/with-active-offer/with-active-offer";
import withOfferDetails from "../../hocs/with-offer-details/with-offer-details";

import {ratingToPercent} from "../../util";
import {offerPropType, reviewPropType, authorizationStatusPropType} from "../../props";
import {OFFER_TYPE_TITLES, AuthorizationStatus} from "../../const";

const OffersList = withActiveOffer(BasicOffersList);

const OfferScreen = (props) => {
  const {authorizationStatus, offer, nearestOffers, reviews} = props;
  let offerInfo = null;

  if (offer && nearestOffers && reviews) {
    const {
      id, pictures, isPremium, nightlyCost, title, type, rating, description, bedrooms, maxAdults, features,
      host: {
        name: hostName,
        avatar: hostAvatar,
        isSuper: isHostSuper
      }
    } = offer;

    offerInfo = (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {pictures.map((url, idx) => (
                <div className="property__image-wrapper" key={idx}>
                  <img className="property__image" src={url} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <BookmarkButton baseClassName="property__bookmark-button" offer={offer}>
                  <svg className="place-card__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </BookmarkButton>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${ratingToPercent(rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {OFFER_TYPE_TITLES[type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} {bedrooms === 1 ? `Bedroom` : `Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{nightlyCost}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {features.map((feature) => (
                    <li className="property__inside-item" key={feature}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={
                    `property__avatar-wrapper user__avatar-wrapper` +
                    (isHostSuper ? ` property__avatar-wrapper--pro` : ``)
                  }>
                    <img className="property__avatar user__avatar" src={hostAvatar} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {hostName}
                  </span>
                </div>
                <div className="property__description">
                  {description.split(`\n`).map((descriptionLine, idx) => (
                    <p className="property__text" key={idx}>
                      {descriptionLine}
                    </p>
                  ))}
                </div>
              </div>
              <ReviewsList
                reviews={reviews}
                displayReviewForm={authorizationStatus === AuthorizationStatus.AUTH}
                offerId={id}
              />
            </div>
          </div>
          <GeoMap
            className="property__map"
            mapCenter={offer.city.coordinates}
            offers={nearestOffers}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <OffersList
              listClassName="near-places__list"
              itemClassName="near-places__card"
              offers={nearestOffers}
            />

          </section>
        </div>
      </main>
    );
  }

  return (
    <div className="page">
      <MainHeader />
      {offerInfo}
    </div>
  );
};

OfferScreen.propTypes = {
  offer: offerPropType,
  nearestOffers: PropTypes.arrayOf(offerPropType.isRequired),
  reviews: PropTypes.arrayOf(reviewPropType.isRequired),
  authorizationStatus: authorizationStatusPropType,
  postReview: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus,
});

export {OfferScreen};
export default connect(mapStateToProps)(withOfferDetails(OfferScreen));
