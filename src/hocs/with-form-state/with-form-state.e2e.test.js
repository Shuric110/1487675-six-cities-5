import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFormState from "./with-form-state";

Enzyme.configure({
  adapter: new Adapter(),
});

const initialState = {
  val1: `test1`,
  val2: `test2`,
};

const MockComponent = () => <div />;
const MockComponentWrapped = withFormState(initialState)(MockComponent);

it(`withFormState should initialize state from parameter and change it by call`, () => {

  const wrapper = shallow(
      <MockComponentWrapped />
  );

  expect(wrapper.props().state).toEqual(initialState);

  wrapper.props().setState({val1: `test12345`});
  expect(wrapper.props().state).toEqual({
    val1: `test12345`,
    val2: `test2`,
  });

  wrapper.props().setState({val2: `test54321`});
  expect(wrapper.props().state).toEqual({
    val1: `test12345`,
    val2: `test54321`,
  });
});
