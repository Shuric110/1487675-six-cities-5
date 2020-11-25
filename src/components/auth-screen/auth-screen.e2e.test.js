import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {AuthScreen} from "./auth-screen";

Enzyme.configure({
  adapter: new Adapter(),
});

jest.mock(`../main-header/main-header`, () => () => `MainHeader`);

it(`Login should be performed on form submit`, () => {
  const handleSubmit = jest.fn();

  const wrapper = mount(
      <AuthScreen
        returnUrl="/return"
        authorizationStatus="NO_AUTH"
        onSubmit={handleSubmit}
      />
  );

  wrapper.find(`input[name="email"]`).instance().value = `test@test.com`;
  wrapper.find(`input[name="password"]`).instance().value = `password123`;
  wrapper.find(`form.login__form`).simulate(`submit`, {preventDefault: () => {}});

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenNthCalledWith(1, {
    email: `test@test.com`,
    password: `password123`,
    returnUrl: `/return`
  });

});
