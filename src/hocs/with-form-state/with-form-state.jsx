import React, {PureComponent} from 'react';

const withFormState = (initialState) => (Component) => {
  class WithFormState extends PureComponent {
    constructor(props) {
      super(props);

      this.state = initialState || {};
      this.setState = this.setState.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        state={this.state}
        setState={this.setState}
      />;
    }
  }

  WithFormState.propTypes = {
  };

  return WithFormState;
};

export default withFormState;
