import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const withFormState = (Component, initialState) => {
  class WithFormState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = initialState || {};
      this.setState = this.setState.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.clearFormState = this.clearFormState.bind(this);
    }

    clearFormState() {
      this.setState(
          (state) => Object.keys(state).reduce(
              (result, key) => Object.assign(result, {[key]: ``}),
              {}
          )
      );
    }

    handleFormSubmit() {
      this.props.onFormSubmit(this.state, this.clearFormState);
    }

    render() {
      return <Component
        {...this.props}
        state={this.state}
        setState={this.setState}
        onFormSubmit={this.handleFormSubmit}
      />;
    }
  }

  WithFormState.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  return WithFormState;
};

export default withFormState;
