import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import withFormState from "../../hocs/with-form-state/with-form-state";

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
};

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: null,
      text: ``,
    };

    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleRatingChange(evt) {
    this.props.setState({rating: +evt.target.value});
  }

  handleTextChange(evt) {
    this.props.setState({text: evt.target.value});
  }

  handleFormSubmit(evt) {
    evt.preventDefault();
    this.props.onFormSubmit();
  }

  render() {
    const {rating, text} = this.props.state;

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this.handleFormSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {Object.entries(StarsLabels).reverse().map(([stars, title]) => (
            <React.Fragment key={stars}>
              <input className="form__rating-input visually-hidden" name="rating"
                value={stars} id={`${stars}-stars`} type="radio" checked={rating === +stars} onChange={this.handleRatingChange}
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
          onChange={this.handleTextChange} value={text}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export {ReviewForm};
export default withFormState(ReviewForm, initialState);
