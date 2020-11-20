import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const withFormState = (Component, initialState) => {
  class WithFormState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = initialState || {};
      this.setState = this.setState.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit() {
      this.props.onFormSubmit(this.state);
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
