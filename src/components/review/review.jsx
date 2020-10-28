import React from "react";
import {reviewPropType} from "../../props";
import {ratingToPercent, formatReviewDate, formatDateAsISO} from "../../util";

const Review = (props) => {
  const {authorAvatar, authorName, rating, date, text} = props.review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={authorAvatar} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {authorName}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${ratingToPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {text}
        </p>
        <time className="reviews__time" dateTime={formatDateAsISO(date)}>{formatReviewDate(date)}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: reviewPropType.isRequired,
};

export default Review;
