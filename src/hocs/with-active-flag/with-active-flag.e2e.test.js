import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveFlag from "./with-active-flag";

Enzyme.configure({
  adapter: new Adapter(),
});

const MockComponent = () => <div />;
const MockComponentWrapped = withActiveFlag(MockComponent);

describe(`withActiveFlag should initialize state from props and change it by call`, () => {
  test.each([[1, true], [2, false]])(`Pass #%p`, (_no, initialState) => {
    const wrapper = shallow(
        <MockComponentWrapped
          initialState={initialState}
        />
    );

    expect(wrapper.props().isActive).toEqual(initialState);

    wrapper.props().setIsActive(true);
    expect(wrapper.props().isActive).toEqual(true);

    wrapper.props().setIsActive(false);
    expect(wrapper.props().isActive).toEqual(false);
  });

});
