import React from "react";
import PropTypes from "prop-types";
import {reviewPropType} from "../../props";
import Review from "../review/review";
import ReviewForm from "../review-form/review-form";

const ReviewsList = (props) => {
  const {reviews} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review
            key={review.id}
            review={review}
          />
        ))}
      </ul>

      <ReviewForm
        onFormSubmit={(data) => console.log(data)}
      />
    </section>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropType.isRequired).isRequired,
};

export default ReviewsList;
