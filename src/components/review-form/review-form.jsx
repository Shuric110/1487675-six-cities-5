import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import withFormState from "../../hocs/with-form-state/with-form-state";
import {AsyncActionCreator} from "../../store/async-action";
import {MIN_REVIEW_TEXT_LENGTH, MAX_REVIEW_TEXT_LENGTH} from "../../const";

const StarsLabels = {
  1: `terribly`,
  2: `badly`,
  3: `not bad`,
  4: `good`,
  5: `perfect`,
};

const initialState = {
  rating: null,
  text: ``,
  formDisabled: false,
};

const validateForm = (state) => {
  const {rating, text} = state;
  return rating > 0 && text.length >= MIN_REVIEW_TEXT_LENGTH && text.length <= MAX_REVIEW_TEXT_LENGTH;
};

const ReviewForm = (props) => {
  const {offerId, postReview, setState, state} = props;
  const {formDisabled, rating, text} = state;

  const submitDisabled = formDisabled || !validateForm(state);

  const handleRatingChange = (evt) => setState({rating: +evt.target.value});
  const handleTextChange = (evt) => setState({text: evt.target.value});

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    setState({formDisabled: true});
    postReview(offerId, {rating, text}, {
      successCallback: () => {
        setState(initialState);
      },
      errorCallback: () => {
        setState({formDisabled: false});
      }
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(StarsLabels).reverse().map(([stars, title]) => (
          <React.Fragment key={stars}>
            <input className="form__rating-input visually-hidden" name="rating"
              value={stars} id={`${stars}-stars`} type="radio" checked={rating === +stars} onChange={handleRatingChange}
            />
            <label htmlFor={`${stars}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextChange} value={text}
        maxLength={MAX_REVIEW_TEXT_LENGTH}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={submitDisabled}>Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  offerId: PropTypes.number.isRequired,
  postReview: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  postReview(offerId, review, {successCallback, errorCallback}) {
    dispatch(AsyncActionCreator.postReview(offerId, review, {successCallback, errorCallback}));
  }
});

export {ReviewForm};
export default connect(null, mapDispatchToProps)(withFormState(initialState)(ReviewForm));
