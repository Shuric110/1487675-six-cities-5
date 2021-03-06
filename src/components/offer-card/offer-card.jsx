import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

import {offerPropType} from "../../props";
import {OFFER_TYPE_TITLES} from "../../const";
import {ratingToPercent} from "../../util";
import BookmarkButton from "../bookmark-button/bookmark-button";

const OfferCard = (props) => {
  const {itemClassName, offer, onHover, onUnHover} = props;
  const {id, placePicture, isPremium, nightlyCost, title, type, rating} = offer;

  return (
    <article className={`${itemClassName} place-card`}
      onMouseEnter={() => {
        return onHover && onHover();
      }}
      onMouseLeave={() => {
        return onUnHover && onUnHover();
      }}
    >
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}
      <div className="place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={placePicture} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{nightlyCost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton baseClassName="place-card__bookmark-button" offer={offer}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </BookmarkButton>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingToPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{OFFER_TYPE_TITLES[type]}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  itemClassName: PropTypes.string.isRequired,
  offer: offerPropType.isRequired,
  onHover: PropTypes.func,
  onUnHover: PropTypes.func,
};

export default OfferCard;
