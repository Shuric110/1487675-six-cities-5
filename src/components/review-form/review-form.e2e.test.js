import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ReviewForm} from "./review-form";

Enzyme.configure({
  adapter: new Adapter(),
});

jest.mock(`../main-header/main-header`, () => () => `MainHeader`);

const noop = () => {};

describe(`ReviewForm should work correctly`, () => {
  it(`Form with filled rating and short text should have disabled submit button`, () => {
    const wrapper = mount(
        <ReviewForm
          offerId={15}
          postReview={noop}
          setState={noop}
          state={{
            rating: 3,
            text: `short`,
            formDisabled: false,
          }}
        />
    );

    expect(wrapper.find(`button.form__submit`).instance().disabled).toEqual(true);
  });

  it(`Form with filled rating and long text should have disabled submit button`, () => {
    const wrapper = mount(
        <ReviewForm
          offerId={15}
          postReview={noop}
          setState={noop}
          state={{
            rating: 3,
            text: `More than 500 characters long string 890123456789012345678901234567890123456789012345678901234567890` +
              `1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890` +
              `1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890` +
              `1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890` +
              `1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890` +
              `123`,
            formDisabled: false,
          }}
        />
    );

    expect(wrapper.find(`button.form__submit`).instance().disabled).toEqual(true);
  });

  it(`Form with not filled rating and normal length text should have disabled submit button`, () => {
    const wrapper = mount(
        <ReviewForm
          offerId={15}
          postReview={noop}
          setState={noop}
          state={{
            rating: null,
            text: `100 characters long string 8901234567890123456789012345678901234567890123456789012345678901234567890`,
            formDisabled: false,
          }}
        />
    );

    expect(wrapper.find(`button.form__submit`).instance().disabled).toEqual(true);
  });

  it(`Form with filled rating and normal length text and disabled flag should have disabled submit button`, () => {
    const wrapper = mount(
        <ReviewForm
          offerId={15}
          postReview={noop}
          setState={noop}
          state={{
            rating: 3,
            text: `100 characters long string 8901234567890123456789012345678901234567890123456789012345678901234567890`,
            formDisabled: true,
          }}
        />
    );

    expect(wrapper.find(`button.form__submit`).instance().disabled).toEqual(true);
  });

  it(`Form with filled rating and normal length text should have enabled submit button and call a callback on submit`, () => {
    const postReview = jest.fn();
    const preventDefault = jest.fn();
    const setState = jest.fn();

    const wrapper = mount(
        <ReviewForm
          offerId={15}
          postReview={postReview}
          setState={setState}
          state={{
            rating: 3,
            text: `100 characters long string 8901234567890123456789012345678901234567890123456789012345678901234567890`,
            formDisabled: false,
          }}
        />
    );

    wrapper.find(`form.reviews__form`).simulate(`submit`, {preventDefault});

    expect(wrapper.find(`button.form__submit`).instance().disabled).toEqual(false);
    expect(postReview).toHaveBeenCalledTimes(1);
    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(postReview).toHaveBeenNthCalledWith(1, 15, {
      rating: 3,
      text: `100 characters long string 8901234567890123456789012345678901234567890123456789012345678901234567890`
    },
    {
      successCallback: expect.any(Function),
      errorCallback: expect.any(Function),
    });
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenNthCalledWith(1, {formDisabled: true});
  });

  it(`Success callback passed to the submit callback should clear and enable the form`, () => {
    const postReview = jest.fn();
    const setState = jest.fn();

    const wrapper = mount(
        <ReviewForm
          offerId={15}
          postReview={postReview}
          setState={setState}
          state={{
            rating: 3,
            text: `100 characters long string 8901234567890123456789012345678901234567890123456789012345678901234567890`,
            formDisabled: false,
          }}
        />
    );

    wrapper.find(`form.reviews__form`).simulate(`submit`, {preventDefault: noop});
    postReview.mock.calls[0][2].successCallback();

    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenNthCalledWith(2, {
      rating: null,
      text: ``,
      formDisabled: false,
    });
  });

  it(`Error callback passed to the submit callback should enable the form`, () => {
    const postReview = jest.fn();
    const setState = jest.fn();

    const wrapper = mount(
        <ReviewForm
          offerId={15}
          postReview={postReview}
          setState={setState}
          state={{
            rating: 3,
            text: `100 characters long string 8901234567890123456789012345678901234567890123456789012345678901234567890`,
            formDisabled: false,
          }}
        />
    );

    wrapper.find(`form.reviews__form`).simulate(`submit`, {preventDefault: noop});
    postReview.mock.calls[0][2].errorCallback();

    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenNthCalledWith(2, {
      formDisabled: false,
    });
  });

  it(`Filling the form should modify the form state`, () => {
    const setState = jest.fn();

    const wrapper = mount(
        <ReviewForm
          offerId={15}
          postReview={noop}
          setState={setState}
          state={{
            rating: null,
            text: ``,
            formDisabled: false,
          }}
        />
    );

    wrapper.find(`input[name="rating"]`).at(3).simulate(`change`, {target: {value: 4}});
    wrapper.find(`textarea[name="review"]`).simulate(`change`, {target: {value: `test12345`}});

    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenNthCalledWith(1, {
      rating: 4,
    });
    expect(setState).toHaveBeenNthCalledWith(2, {
      text: `test12345`,
    });
  });
});
